const { prisma } = require('../../generated/prisma-client');

const inventoryItem = {
  inventoryItem(parent, { where }) {
    return prisma.inventoryItem(where);
  },
  inventoryItems(parent, args) {
    return prisma.inventoryItems(args);
  },
  async inventoryItemsConnection(parent, args) {
    const results = await prisma.inventoryItemsConnection(args);
    results.aggregate = await prisma.inventoryItemsConnection(args).aggregate();
    return results;
  },
};

module.exports = { inventoryItem };
