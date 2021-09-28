const { prisma } = require('../../generated/prisma-client');

const InventoryItem = {
  async deliveryItems({ id }) {
    return prisma.deliveryItems({ where: { itemId: id } });
  },
};

module.exports = {
  InventoryItem,
};
