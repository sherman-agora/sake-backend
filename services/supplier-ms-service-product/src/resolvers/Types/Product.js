const { prisma } = require('../../generated/prisma-client');

const Product = {
  async categories({ id }) {
    return prisma.product({ id }).categories();
  },

  async images({ id }) {
    return prisma.product({ id }).images();
  },

  async minOrderQuantity({ id }) {
    return await prisma.product({ id }).minOrderQuantity();
  },

  __resolveReference({ id }) {
    return prisma.product({ id });
  }
};

module.exports = {
  Product,
};
