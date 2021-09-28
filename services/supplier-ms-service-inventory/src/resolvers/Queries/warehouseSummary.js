const { prisma } = require('../../generated/prisma-client');

const warehouseSummary = {
  warehouseSummary(parent, { where }) {
    return prisma.warehouseSummary(where);
  },
  warehouseSummaries(parent, args) {
    return prisma.warehouseSummaries(args);
  },
  async warehouseSummariesConnection(parent, args) {
    const results = await prisma.warehouseSummariesConnection(args);
    results.aggregate = await prisma.warehouseSummariesConnection(args).aggregate();
    return results;
  },
};

module.exports = { warehouseSummary };
