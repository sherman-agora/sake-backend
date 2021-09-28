const { prisma } = require('../../generated/prisma-client');

const updateProductSummary = async items => {
  const summaries = await items.reduce(async (pre, { quantity, productId }) => {
    await pre;
    if (!productId) {
      return;
    }
    const productSummary = await prisma.productSummary({ productId });
    console.log('productSummary: ', productSummary);

    return prisma.updateProductSummary({
      where: { id: productSummary.id },
      data: {
        outgoingQuantity: productSummary.outgoingQuantity + quantity,
        quantity: productSummary.quantity - quantity,
      },
    });
  }, []);
  return summaries;
};

const salesOrder = {
  whenSalesOrderCreated(data) {
    console.log('data: ', JSON.stringify(data));
    return updateProductSummary(data.products.create);
  },
  whenSalesOrderItemCreated(data) {
    console.log('data: ', data);
    return updateProductSummary([data]);
  },
  whenSalesOrderItemUpdated(data) {
    const previousQty = data.previousItem.quantity;
    const currentQty = data.data.data.quantity;
    return updateProductSummary([{ quantity: currentQty - previousQty, productId: data.previousItem.productId }]);
  },
  whenSalesOrderItemDeleted(data) {
    const currentQty = -data.quantity;
    return updateProductSummary([{ quantity: currentQty, productId: data.productId }]);
  },
};
module.exports = {
  salesOrder,
};
