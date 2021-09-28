const producer = require('../../kafka/producer');

const product = {
  async createProduct(parent, { data }, { prisma }) {
    const results = await prisma.createProduct(data);
    producer(
      {
        topic: 'ProductCreate',
        message: { results },
      },
    );
    return results;
  },
  async updateProduct(parent, args, { prisma }) {
    console.log('infunction');
    const results = await prisma.updateProduct(args);
    producer(
      {
        topic: 'ProductUpdate',
        message: args,
      },
    );
    return results;
  },
  async deleteProduct(parent, { where }, { prisma }) {
    const results = await prisma.deleteProduct(where);
    producer(
      {
        topic: 'ProductDelete',
        message: where,
      },
    );
    return results;
  },
};

module.exports = { product };
