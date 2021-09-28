const { prisma } = require('../../generated/prisma-client');

const warehouse = {
  warehouse(parent, { where }) {
    return prisma.warehouse(where);
  },
  warehouses(parent, args) {
    return prisma.warehouses(args);
  },
  async warehousesConnection(parent, args) {
    const results = await prisma.warehousesConnection(args);
    results.aggregate = await prisma.warehousesConnection(args).aggregate();
    return results;
  },
};

module.exports = { warehouse };
