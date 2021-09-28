const { prisma } = require('../../generated/prisma-client');

const WarehouseSummaryConnection = {
  aggregate: (parent, args) => {
    return prisma.warehouseSummariesConnection(args).aggregate();
  },
};

module.exports = {
  WarehouseSummaryConnection,
};
