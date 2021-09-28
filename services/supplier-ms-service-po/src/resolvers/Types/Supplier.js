const { prisma } = require('../../generated/prisma-client');

const Supplier = {
  purchaseOrders({ id }) {
    return prisma.purchaseOrders({ where: { supplierId: id } });
  }
};

module.exports = {
  Supplier,
};
