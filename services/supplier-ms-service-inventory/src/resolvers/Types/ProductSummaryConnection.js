const { prisma } = require('../../generated/prisma-client');

const ProductSummaryConnection = {
  aggregate: (parent, args) => {
    return prisma.productSummariesConnection(args).aggregate();
  },
};

module.exports = {
  ProductSummaryConnection,
};
