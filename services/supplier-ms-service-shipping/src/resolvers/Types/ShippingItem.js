const { prisma } = require('../../generated/prisma-client');

const ShippingItem = {
  async shipping({ id }) {
    return prisma.shippingItem({ id }).shipping();
  },

  async product({ id }) {
    const data = await prisma.shippingItem({ id });
    return { __typename: 'Product', id: data.productId };
  },

  async warehouse({ id }) {
    const data = await prisma.shippingItem({ id });
    if (!data.warehouseId) {
      return null;
    }
    return { __typename: 'Warehouse', id: data.warehouseId };
  },

  __resolveReference({ id }) {
    return prisma.shippingItem({ id });
  }
}

module.exports = {
  ShippingItem,
}
