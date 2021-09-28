const { prisma } = require('../../generated/prisma-client');

const Product = {
  async purchaseOrderItems({ id }) {
    return prisma.purchaseOrderItems({ where: { productId: id } });
  },
}

module.exports = {
  Product,
}
