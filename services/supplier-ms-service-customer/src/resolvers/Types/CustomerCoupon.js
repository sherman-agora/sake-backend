const CustomerCoupon = {
  async customer({ id }, args, { prisma }) {
    return prisma.customerCoupon({ id }).customer();
  },

  // eslint-disable-next-line no-underscore-dangle
  __resolveReference({ id }, { fetchCustomerById, where }, { prisma }) {
    console.log('__resolveReference', fetchCustomerById, where, id, prisma);
    return prisma.customerCoupon({ id });
  },
};

module.exports = {
  CustomerCoupon,
};
