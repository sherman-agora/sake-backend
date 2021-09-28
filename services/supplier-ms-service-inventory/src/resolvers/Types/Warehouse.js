const { prisma } = require('../../generated/prisma-client');

const Warehouse = {
  __resolveReference({ id }) {
    return prisma.warehouse({ id });
  },

  products: ({ id }, args) => {
    return prisma.warehouse({ id }).products(args);
  },

  summaries: ({ id }, args) => {
    return prisma.warehouse({ id }).summaries(args);
  }
};

module.exports = {
  Warehouse,
};
