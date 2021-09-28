const { prisma } = require('../../generated/prisma-client');

const ExpiryDateSummaryConnection = {
  aggregate: (parent, args) => {
    return prisma.expiryDateSummariesConnection(args).aggregate();
  },
};

module.exports = {
  ExpiryDateSummaryConnection,
};
