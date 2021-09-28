const { prisma } = require('../../generated/prisma-client');

const inventoryItem = {
  async createInventoryItem(parent, { data }) {
    const results = await prisma.createInventoryItem(data);
    return results;
  },
  async updateInventoryItem(parent, args) {
    const results = await prisma.updateInventoryItem(args);
    return results;
  },
  async deleteInventoryItem(parent, { where }) {
    const results = await prisma.deleteInventoryItem(where);
    return results;
  },
  async deleteManyInventoryItems(parent, { where }) {
    const results = await prisma.deleteManyInventoryItems(where);
    return results;
  },
};

module.exports = { inventoryItem };
