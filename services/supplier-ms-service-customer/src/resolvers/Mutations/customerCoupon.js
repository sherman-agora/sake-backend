const customerConpon = {
  async createCustomerCoupon(parent, { data }, { prisma }) {
    const results = await prisma.createCustomerCoupon(data);
    return results;
  },
  async updateCustomerCoupon(parent, args, { prisma }) {
    const results = await prisma.updateCustomerCoupon(args);
    return results;
  },
  deleteCustomerCoupon(parent, { where }, { prisma }) {
    return prisma.deleteCustomerCoupon(where);
  },
};

module.exports = { customerConpon };
