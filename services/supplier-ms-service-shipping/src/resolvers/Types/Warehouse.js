const { prisma } = require('../../generated/prisma-client');

const Warehouse = {
  async shippingItems({ id }) {
    return prisma.shippingItems({ where: { warehouseId: id } });
  },
}

module.exports = {
  Warehouse,
}
