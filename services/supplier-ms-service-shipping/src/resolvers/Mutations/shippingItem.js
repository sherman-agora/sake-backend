const shippingItem = {
  async createShippingItem(parent, { data }, { prisma }) {
    return prisma.createShippingItem(data);
  },
  async updateShippingItem(parent, args, { prisma }) {
    const results = await prisma.updateShippingItem(args);
    return results;
  },
  async deleteShippingItem(parent, { where }, { prisma }) {
    const results = await prisma.deleteShippingItem(where);
    return results;
  },
};

module.exports = { shippingItem };
