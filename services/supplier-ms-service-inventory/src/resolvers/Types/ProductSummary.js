const { prisma } = require('../../generated/prisma-client');

const ProductSummary = {
  __resolveReference({ id }) {
    return prisma.productSummary({ id });
  },

  async product({ id }) {
    const data = await prisma.productSummary({ id });
    return { __typename: 'Product', id: data.productId };
  },

  async items({ id }) {
    const data = await prisma.productSummary({ id });
    return prisma.inventoryItems({ where: { productId: data.productId } });
  },
};

module.exports = {
  ProductSummary,
};
