const Warehouse = {
  __resolveReference({ id }, { where }, { prisma }) {
    return prisma.warehouse({ id });
  }
}

module.exports = {
  Warehouse,
}
