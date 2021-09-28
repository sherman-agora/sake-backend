const Query = {
  warehouse(parent, { where }, { prisma }) {
    return prisma.warehouse(where)
  },
  warehouses(parent, args, { prisma }) {
    return prisma.warehouses(args);
  },
  async warehousesConnection(parent, args, { prisma }) {
    const results = await prisma.warehousesConnection(args);
    results.aggregate = await prisma.warehousesConnection(args).aggregate();
    return results;
  },
}

module.exports = { Query }
