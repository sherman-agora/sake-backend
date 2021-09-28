const { prisma } = require('../../generated/prisma-client');

const WarehouseConnection = {
  aggregate: (parent, args) => {
    return prisma.warehousesConnection(args).aggregate();
  },
};

module.exports = {
  WarehouseConnection,
};
