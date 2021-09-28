const { prisma } = require('../../generated/prisma-client');

const SalesOrder = {
  async shop({ id }) {
    const data = await prisma.salesOrder({ id });
    return { __typename: 'CustomerShop', id: data.shopId };
  },

  async products({ id }, args) {
    return prisma.salesOrder({ id }).products(args);
  },

  // async user({ id }) {
  //   return { __typename: 'User', id };
  // },

  __resolveReference({ id }) {
    return prisma.salesOrder({ id });
  },
};

module.exports = {
  SalesOrder,
};
