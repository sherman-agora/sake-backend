const { prisma } = require('../../generated/prisma-client');

const expiryDateSummary = {
  expiryDateSummary(parent, { where }) {
    return prisma.expiryDateSummary(where);
  },
  expiryDateSummaries(parent, args) {
    return prisma.expiryDateSummaries(args);
  },
  async expiryDateSummariesConnection(parent, args) {
    const results = await prisma.expiryDateSummariesConnection(args);
    results.aggregate = await prisma.expiryDateSummariesConnection(args).aggregate();
    return results;
  },
};

module.exports = { expiryDateSummary };
