const { prisma } = require('../../generated/prisma-client');

const PurchaseOrder = {
  inventoryItems({ id }, args) {
    return prisma.inventoryItems({ where: { purchaseOrderId: id } });
  }
};

module.exports = {
  PurchaseOrder,
};
