const { prisma } = require('../../generated/prisma-client');

const productSummary = {
  productSummary(parent, { where }) {
    return prisma.productSummary(where);
  },
  productSummaries(parent, args) {
    return prisma.productSummaries(args);
  },
  async productSummariesConnection(parent, args) {
    const results = await prisma.productSummariesConnection(args);
    results.aggregate = await prisma.productSummariesConnection(args).aggregate();
    return results;
  },
};

module.exports = { productSummary };
