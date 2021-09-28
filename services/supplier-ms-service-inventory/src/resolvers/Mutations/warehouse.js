const { prisma } = require('../../generated/prisma-client');

const warehouse = {
  async createWarehouse(parent, { data }) {
    const results = await prisma.createWarehouse(data);
    return results;
  },
  async updateWarehouse(parent, args) {
    const results = await prisma.updateWarehouse(args);
    return results;
  },
  async deleteWarehouse(parent, { where }) {
    const results = await prisma.deleteWarehouse(where);
    return results;
  },
};

module.exports = { warehouse };
