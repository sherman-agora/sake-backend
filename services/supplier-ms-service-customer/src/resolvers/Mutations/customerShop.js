const producer = require('../../kafka/producer');

const customerShop = {
  async createCustomerShop(parent, { data }, { prisma }) {
    const results = await prisma.createCustomerShop(data);
    producer(
      {
        topic: 'CustomerShopCreate',
        message: { ...data, id: results.id },
      },
    );
    return results;
  },
  async updateCustomerShop(parent, args, { prisma }) {
    const results = await prisma.updateCustomerShop(args);
    producer(
      {
        topic: 'CustomerShopUpdate',
        message: args,
      },
    );
    return results;
  },
  deleteCustomerShop(parent, { where }, { prisma }) {
    producer(

      {
        topic: 'CustomerShopDelete',
        message: where,
      },
    );
    return prisma.deleteCustomerShop(where);
  },
};

module.exports = { customerShop };
