const customerGroup = {
  customerGroup(parent, { where }, { prisma }) {
    return prisma.customerGroup(where);
  },
  customerGroups(parent, args, { prisma }) {
    return prisma.customerGroups(args);
  },
  async customerGroupsConnection(parent, args, { prisma }) {
    const results = await prisma.customersConnection(args);
    results.aggregate = await prisma.customersConnection(args).aggregate();
    return results;
  },
};

module.exports = { customerGroup };
