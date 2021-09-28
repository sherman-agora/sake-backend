const productCategory = {
  productCategory(parent, { where }, { prisma }) {
    return prisma.productCategory(where);
  },
  productCategories(parent, args, {prisma}) {
    return prisma.productCategories(args);
  },
  async productCategoriesConnection(parent, args, {prisma}) {
    const results = await prisma.productCategoriesConnection(args);
    results.aggregate = await prisma.productCategoriesConnection(args).aggregate();
    return results;
  },
};

module.exports = { productCategory: productCategory };
