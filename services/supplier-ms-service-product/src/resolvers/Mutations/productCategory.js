const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const productCategory = {
  async createProductCategory(parent, { data }) {
    const results = await prisma.createProductCategory(data);
    producer(
      {
        topic: 'ProductCategoryCreate',
        message: { ...data, ...results },
      },
    );
    return results;
  },
  async updateProductCategory(parent, args) {
    const results = await prisma.updateProductCategory(args);
    producer(
      {
        topic: 'ProductCategoryUpdate',
        message: args,
      },
    );
    return results;
  },
  async deleteProductCategory(parent, { where }) {
    const results = await prisma.deleteProductCategory(where);
    return results;
  },
};

module.exports = { productCategory };
