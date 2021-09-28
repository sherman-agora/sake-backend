const { prisma } = require('../../generated/prisma-client');

const Product = {
  async salesOrderItems({ id }) {
    return prisma.salesOrderItems({ where: { productId: id } });
  },
}

module.exports = {
  Product,
}
