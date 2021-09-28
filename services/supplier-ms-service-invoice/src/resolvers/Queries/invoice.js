const invoice = {
  invoice(parent, { where }, { prisma }) {
    return prisma.invoice(where);
  },
  invoices(parent, args, { prisma }) {
    return prisma.invoices(args);
  },
  async invoicesConnection(parent, args, { prisma }) {
    const results = await prisma.invoicesConnection(args);
    results.aggregate = await prisma.invoicesConnection(args).aggregate();
    return results;
  },
};

module.exports = { invoice };