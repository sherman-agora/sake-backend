const producer = require('../../kafka/producer');
const salesOrderWebhook = require('../../kafka/salesOrderWebhook');

const updateSalesOrderTotalPrice = async (salesOrderId, prisma, data) => {
  const results = await prisma.salesOrder({ id: salesOrderId });
  console.log('data', {
    subtotal: results.subtotal + data.wholeSalePrice * data.quantity,
    grandTotal: results.grandTotal + data.price * data.quantity,
    discountAmount: results.discountAmount + data.discountAmount,
  });
  const updatePrice = await prisma.updateSalesOrder({
    where: { id: salesOrderId },
    data: {
      subtotal: results.subtotal + data.wholeSalePrice * data.quantity,
      grandTotal: results.grandTotal + data.price * data.quantity,
      discountAmount: results.discountAmount + data.discountAmount,
    },
  });
  console.log('updatePrice', updatePrice);

  const latestSalesOrder = await prisma.salesOrder({ id: salesOrderId });

  producer(
    {
      topic: 'SOUpdate1',
      message: latestSalesOrder,
    },
  );
  return latestSalesOrder;
};

const createSalesOrderItemQuantity = data => {
  producer(
    {
      topic: 'SalesOrderItemCreate',
      message: data,
    },
  );
  return data;
};

const updateInventoryItemQty = async (previousItem, data) => {
  producer(
    {
      topic: 'SalesOrderItemUpdate',
      message: { previousItem: previousItem, data },
    },
  );
  return data;
};
const resumeInventoryItemQty = (quantity, productId) => {
  return producer(
    {
      topic: 'SalesOrderItemDelete',
      message: { quantity, productId },
    },
  );
};

const calculateSubPriceAmount = p => {
  console.log(' in function ', p);
  if (p.discount) {
    if (p.discount.includes('%')) {
      const percent = 1 - parseFloat(p.discount) / 100;
      return parseFloat(p.price) / percent;
    } else if (p.discount.includes('HKD')) {
      const discountAmount = parseFloat(p.discount.replace('HKD', ''));
      return parseFloat(p.price) + discountAmount;
    }
  } else {
    return parseFloat(p.price);
  }
};

const updatePriceWhenEditSalesOrderItem = async ({ id, subtotal, grandTotal }, prisma, tempData) => {
  const results = await prisma.updateSalesOrder({
    where: { id },
    data: {
      subtotal: subtotal - tempData.preWholeSalePrice * tempData.preQuantity,
      grandTotal: grandTotal - tempData.prePrice * tempData.preQuantity,
    },
  });
  console.log('delete price: ', results);
  const newSalesOrder = await prisma.updateSalesOrder({
    where: { id },
    data: {
      subtotal: results.subtotal + tempData.wholeSalePrice * tempData.quantity,
      grandTotal: results.grandTotal + tempData.price * tempData.quantity,
    },
  });
  console.log('add price: ', newSalesOrder);
  const updateDiscountAmount = await prisma.updateSalesOrder({
    where: { id },
    data: {
      discountAmount: newSalesOrder.subtotal - newSalesOrder.grandTotal,
    },
  });
  console.log('update discount: ', updateDiscountAmount);
  producer(
    {
      topic: 'SOUpdate1',
      message: updateDiscountAmount,
    },
  );
  return updateDiscountAmount;
};

const salesOrderItem = {
  async createSalesOrderItem(parent, { data }, { prisma }) {
    // eslint-disable-next-line no-param-reassign
    data.totalPrice = data.price * data.quantity;
    data.wholeSalePrice = calculateSubPriceAmount(data);
    data.discountAmount = calculateSubPriceAmount(data) * data.quantity - data.totalPrice;
    const results = await prisma.createSalesOrderItem(data);
    console.log('results: ', results);
    await updateSalesOrderTotalPrice(data.salesOrder.connect.id, prisma, data);
    await createSalesOrderItemQuantity(data);
    await salesOrderWebhook(data.salesOrder.connect.id);
    return results;
  },

  async updateSalesOrderItem(parent, args, { prisma }) {
    const tempData = { ...args.data };
    console.log('out function ', args);
    const item = await prisma.salesOrderItem(args.where);
    await updateInventoryItemQty(item, args);
    const q = args.data.quantity;
    // eslint-disable-next-line no-param-reassign
    tempData.preQuantity = item.quantity;
    tempData.preWholeSalePrice = item.wholeSalePrice;
    tempData.prePrice = item.price;
    args.data.totalPrice = args.data.price * q;
    args.data.discountAmount = args.data.wholeSalePrice * args.data.quantity - args.data.totalPrice;
    tempData.totalPrice = args.data.totalPrice;
    tempData.discountAmount = args.data.discountAmount;
    const salesOrder = await prisma.salesOrderItem(args.where).salesOrder();

    console.log('presalesOrder : ', salesOrder);

    const results = await prisma.updateSalesOrderItem(args);
    console.log('temp:@@@@@', tempData);
    await updatePriceWhenEditSalesOrderItem(salesOrder, prisma, tempData);
    producer(
      {
        topic: 'SOWebhook',
        message: { id: salesOrder.id },
      },
    );
    return results;
  },
  async deleteSalesOrderItem(parent, { where }, { prisma }) {
    const item = await prisma.salesOrderItem(where);
    console.log('item', item);
    const salesOrder = await prisma.salesOrderItem(where).salesOrder();

    const data = {
      wholeSalePrice: -item.wholeSalePrice,
      quantity: item.quantity,
      discountAmount: -item.discountAmount,
      price: -item.price,
    };
    // add negative number for minus this item price and discount
    await updateSalesOrderTotalPrice(salesOrder.id, prisma, data);
    const results = await prisma.deleteSalesOrderItem(where);
    resumeInventoryItemQty(item.quantity, item.productId);
    producer(
      {
        topic: 'SOWebhook',
        message: { id: salesOrder.id },
      }
    )
    return results;
  },
};

module.exports = { salesOrderItem };
