const product = {
  product(parent, { where }, { prisma }) {
    return prisma.product(where);
  },
  products(parent, args, {prisma}) {
    return prisma.products(args);
  },
  async productsConnection(parent, args, {prisma}) {
    const results = await prisma.productsConnection(args);
    results.aggregate = await prisma.productsConnection(args).aggregate();
    return results;
  },
};

module.exports = { product };
