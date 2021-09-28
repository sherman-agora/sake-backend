const { prisma } = require('../../generated/prisma-client');

const Customer = {
  async group({ id }) {
    return await prisma.customer({ id }).group();
  },
  async shops({ id }) {
    return await prisma.customer({ id }).shops();
  },
  async coupons({ id }) {
    return await prisma.customer({ id }).coupons();
  },

  __resolveReference({ id }) {
    return prisma.customer({ id });
  },
};

module.exports = {
  Customer,
};
