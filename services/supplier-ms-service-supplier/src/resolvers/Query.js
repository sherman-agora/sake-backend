const Query = {
  supplier(parent, { where }, { prisma }) {
    return prisma.supplier(where);
  },
  suppliers(parent, args, { prisma }) {
    return prisma.suppliers(args);
  },
  async suppliersConnection(parent, args, { prisma }) {
    const results = await prisma.suppliersConnection(args);
    results.aggregate = await prisma.suppliersConnection(args).aggregate();
    return results;
  },
}

module.exports = { Query }
