const producer = require('../../kafka/producer');
const salesOrderWebhook = require('../../kafka/salesOrderWebhook');
const { prisma } = require('../../generated/prisma-client');
const { at } = require('lodash');

const calculateSalesOrderPrice = async (results, args) => {
  console.log('Call function here');
  const items = await prisma.salesOrder({ id: results.id }).products();
  console.log('items: ', items);
  const itemsDiscountPrice = items.reduce((r, item) => r + item.discountAmount, 0);
  console.log('itemsTotalPrice: ', itemsDiscountPrice);
  const grandTotal = results.subtotal - itemsDiscountPrice - results.couponDiscount - args.data.discount;
  console.log('grandTotal: ', grandTotal);

  const update = await prisma.updateSalesOrder({
    where: { id: results.id },
    data: {
      grandTotal,
      discountAmount: results.subtotal - grandTotal,
    },
  });
  console.log('update: ', update);
  return update;
};

const salesOrder = {
  async createSalesOrder(parent, { data }, { prisma }) {
    let results;
    if (!data.discountAmount) {
      results = await prisma.createSalesOrder({
        ...data,
        discountAmount: 0,
        subtotal: data.grandTotal,
        actualDate: new Date(),
      });
    } else {
      results = await prisma.createSalesOrder(data);
    }

    producer({
      topic: 'SOCreate',
      message: data,
    });
    return results;
  },
  async updateSalesOrder(parent, args, { prisma }) {
    console.log('args: ', args);
    const keys = Object.keys(args.data);
    const results = await prisma.updateSalesOrder(args);

    if (keys.length === 1 && keys[0] === 'actualDate') {
      console.log('just Actual date');
      return results;
    } else {
      console.log('SalesOrder Update: ', results);
      console.log('args: before discount', args);
      console.log('discount: ', args.data.discount);
      if (!!args.data.discount || args.data.discount >= 0) {
        console.log('args.data.discount: ', args.data.discount);
        await calculateSalesOrderPrice(results, args);
      }
      const latestSO = await prisma.salesOrder({ id: args.where.id });
      await producer({ topic: 'SOUpdate1', message: latestSO });
      await producer({ topic: 'SOWebhook', message: { id: results.id } });
      return results;
    }
  },
  async deleteSalesOrder(parent, { where }, { prisma }) {
    const results = await prisma.updateSalesOrder({ where, data: { state: 'DELETED' } });
    await producer({ topic: 'SalesOrderDelete', message: where });
    await producer({ topic: 'SOWebhook', message: { id: where.id } });
    return results;
  },
  async updateSalesOrderByXero(parent, { where }, { prisma }) {
    const results = await prisma.updateSalesOrder({ where, data: { state: 'PAID' } });
    return results;
  },
};

module.exports = { salesOrder };
