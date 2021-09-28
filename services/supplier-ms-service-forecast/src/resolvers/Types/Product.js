const { prisma } = require('../../generated/prisma-client');

const Product = {
  async monthlySalesOnAverage({ id }) {
    const forecastProduct = await prisma.forecastProduct({ productId: id });
    return forecastProduct ? forecastProduct.monthlySalesOnAverage : 0;
  },

  async numberOfMonth({ id }) {
    const forecastProduct = await prisma.forecastProduct({ productId: id });
    return forecastProduct ? forecastProduct.numberOfMonth : 0;
  },
};

module.exports = {
  Product,
};
