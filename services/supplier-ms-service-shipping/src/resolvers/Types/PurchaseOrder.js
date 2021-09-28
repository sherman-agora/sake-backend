const { prisma } = require('../../generated/prisma-client');

const PurchaseOrder = {
  async shippings({ id }) {
    return prisma.shippings({ where: { purchaseOrderId: id } });
  }
};

module.exports = {
  PurchaseOrder,
};
