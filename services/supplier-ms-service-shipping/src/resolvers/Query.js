const Query = {
  shipping(parent, { where }, { prisma }) {
    return prisma.shipping(where);
  },
  shippings(parent, args, { prisma }) {
    return prisma.shippings(args);
  },
  async shippingsConnection(parent, args, { prisma }) {
    const results = await prisma.shippingsConnection(args);
    results.aggregate = await prisma.shippingsConnection(args).aggregate();
    return results;
  },
  shippingItem(parent, { where }, { prisma }) {
    return prisma.shippingItem(where);
  },
  shippingItems(parent, args, { prisma }) {
    return prisma.shippingItems(args);
  },
  async shippingItemsConnection(parent, args, { prisma }) {
    const results = await prisma.shippingItemsConnection(args);
    results.aggregate = await prisma.shippingItemsConnection(args).aggregate();
    return results;
  },
};

module.exports = { Query };
