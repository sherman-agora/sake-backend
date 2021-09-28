const { prisma } = require('../../generated/prisma-client');

const productSummary = {
  async createProductSummary(parent, { data }) {
    const results = await prisma.createProductSummary(data);
    return results;
  },
  async updateProductSummary(parent, args) {
    const results = await prisma.updateProductSummary(args);
    return results;
  },
  async deleteProductSummary(parent, { where }) {
    const results = await prisma.deleteProductSummary(where);
    return results;
  },
};

module.exports = { productSummary };
