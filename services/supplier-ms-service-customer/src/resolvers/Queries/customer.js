const customer = {
  customer(parent, { where }, { prisma }) {
    return prisma.customer(where);
  },
  customers(parent, args, { prisma }) {
    return prisma.customers(args);
  },
  async customersConnection(parent, args, { prisma }) {
    const results = await prisma.customersConnection(args);
    results.aggregate = await prisma.customersConnection(args).aggregate();
    return results;
  },
};

module.exports = { customer };
