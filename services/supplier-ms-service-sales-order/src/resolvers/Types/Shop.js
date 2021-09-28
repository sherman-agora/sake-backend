const { prisma } = require('../../generated/prisma-client');

const Shop = {
  async salesOrders({ id }) {
    return prisma.salesOrders({ where: { shopId: id } });
  },
}

module.exports = {
  Shop,
}
