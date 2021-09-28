const { prisma } = require('../../generated/prisma-client');

const WarehouseSummary = {
  __resolveReference({ id }) {
    return prisma.warehouseSummary({ id });
  },

  async product({ id }) {
    const data = await prisma.warehouseSummary({ id });
    return { __typename: 'Product', id: data.productId };
  },

  warehouse({ id }) {
    return prisma.warehouseSummary({ id }).warehouse();
  },

  async items({ id }) {
    const data = await prisma.warehouseSummary({ id });
    const warehouse = await prisma.warehouseSummary({ id }).warehouse();
    return prisma.inventoryItems({ where: { productId: data.productId, warehouse: { id: warehouse.id } } });
  },
};

module.exports = {
  WarehouseSummary,
};
