const { prisma } = require('../../generated/prisma-client');

const Supplier = {
  __resolveReference({ id }) {
    return prisma.supplier({ id });
  }
};

module.exports = {
  Supplier,
};
