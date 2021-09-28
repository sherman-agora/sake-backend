const customerGroup = {
  async createCustomerGroup(parent, { data }, { prisma }) {
    const results = await prisma.createCustomerGroup(data);
    return results;
  },
  async updateCustomerGroup(parent, args, { prisma }) {
    const results = await prisma.updateCustomerGroup(args);
    return results;
  },
  deleteCustomerGroup(parent, { where }, { prisma }) {
    return prisma.deleteCustomerGroup(where);
  },
};

module.exports = { customerGroup };
