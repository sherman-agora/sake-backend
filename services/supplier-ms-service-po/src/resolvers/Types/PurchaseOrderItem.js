const { prisma } = require('../../generated/prisma-client');

const PurchaseOrderItem = {
  async purchaseOrder({ id }, args) {
    return await prisma.purchaseOrderItem({ id }).purchaseOrder(args);
  },

  async product({ id }) {
    const data = await prisma.purchaseOrderItem({ id });
    return { __typename: 'Product', id: data.productId };
  },

  __resolveReference({ id }) {
    return prisma.purchaseOrderItem({ id });
  }
}

module.exports = {
  PurchaseOrderItem,
}
