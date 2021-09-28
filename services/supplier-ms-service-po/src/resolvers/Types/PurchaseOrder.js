const { prisma } = require('../../generated/prisma-client');

const PurchaseOrder = {
  async supplier({ id }) {
    const data = await prisma.purchaseOrder({ id });
    return { __typename: 'Supplier', id: data.supplierId };
  },

  // async user({ id }) {
  //   const data = await prisma.purchaseOrder({ id });
  //   return { __typename: 'User', id: data.userid };
  // },

  async products({ id }, args) {
    return await prisma.purchaseOrder({ id }).products(args);
  },

  __resolveReference({ id }) {
    return prisma.purchaseOrder({ id });
  }
}

module.exports = {
  PurchaseOrder,
}
