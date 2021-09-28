const { prisma } = require('../../generated/prisma-client');

const Shipping = {
  async purchaseOrder({ id }) {
    const data = await prisma.shipping({ id });
    return { __typename: 'PurchaseOrder', id: data.purchaseOrderId };
  },

  // async user({ id }) {
  //   const data = await prisma.shipping({ id });
  //   return { __typename: 'User', id: data.userId };
  // },

  async products({ id }, args) {
    return prisma.shipping({ id }).products(args);
  },

  __resolveReference({ id }) {
    return prisma.shipping({ id });
  }
}

module.exports = {
  Shipping,
}
