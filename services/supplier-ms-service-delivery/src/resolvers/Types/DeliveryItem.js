const { prisma } = require('../../generated/prisma-client');

const DeliveryItem = {
  async deliveryNote({ id }) {
    return prisma.deliveryItem({ id }).deliveryNote();
  },

  async product({ id }) {
    const data = await prisma.deliveryItem({ id });
    return { __typename: 'Product', id: data.productId };
  },

  async item({ id }) {
    const data = await prisma.deliveryItem({ id });
    return { __typename: 'InventoryItem', id: data.itemId };
  },

  __resolveReference({ id }) {
    return prisma.deliveryItem({ id });
  }
};

module.exports = {
  DeliveryItem,
};
