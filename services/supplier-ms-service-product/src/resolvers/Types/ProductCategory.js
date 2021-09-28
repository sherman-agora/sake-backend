const ProductCategory = {
  async products({ id }, args, {prisma}) {
    return await prisma.productCategory({ id }).products(args);
  },

  __resolveReference({ id }, args, { prisma }) {
    console.log('__resolveReference', args, id, prisma);
    return prisma.productCategory({ id });
  }
};

module.exports = {
  ProductCategory,
};
