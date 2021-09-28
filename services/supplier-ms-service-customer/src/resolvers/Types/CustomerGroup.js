const CustomerGroup = {
  async customers({ id }, args, { prisma }) {
    return await prisma.customerGroup({ id }).customers(args);
  },

  __resolveReference({ id }, { fetchCustomerById, where }, { prisma }) {
    console.log('__resolveReference', fetchCustomerById, where, id, prisma);
    return prisma.customerGroup({ id });
  },
};

module.exports = {
  CustomerGroup,
};
