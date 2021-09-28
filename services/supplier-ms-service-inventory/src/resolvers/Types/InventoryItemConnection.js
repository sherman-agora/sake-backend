const { prisma } = require('../../generated/prisma-client');

const InventoryItemConnection = {
  aggregate: (parent, args) => {
    return prisma.inventoryItemsConnection(args).aggregate();
  },
};

module.exports = {
  InventoryItemConnection,
};
