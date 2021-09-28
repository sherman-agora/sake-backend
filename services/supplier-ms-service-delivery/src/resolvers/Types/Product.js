const { prisma } = require('../../generated/prisma-client');

const Product = {
  async deliveryItems({ id }) {
    return prisma.deliveryItems({ where: { productId: id } });
  },
};

module.exports = {
  Product,
};
