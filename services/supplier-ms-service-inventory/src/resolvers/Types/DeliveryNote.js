const { prisma } = require('../../generated/prisma-client');

const DeliveryNote = {
  inventoryItems({ id }, args) {
    return prisma.inventoryItems({ where: { purchaseOrderId: id } });
  }
};

module.exports = {
  DeliveryNote,
};
