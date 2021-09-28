const { prisma } = require('../../generated/prisma-client');

const warehouseSummary = {
  async createWarehouseSummary(parent, { data }) {
    const results = await prisma.createWarehouseSummary(data);
    return results;
  },
  async updateWarehouseSummary(parent, args) {
    const results = await prisma.updateWarehouseSummary(args);
    return results;
  },
  async deleteWarehouseSummary(parent, { where }) {
    const results = await prisma.deleteWarehouseSummary(where);
    return results;
  },
};

module.exports = { warehouseSummary };
