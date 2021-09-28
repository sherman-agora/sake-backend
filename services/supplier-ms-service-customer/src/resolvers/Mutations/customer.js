const producer = require('../../kafka/producer');

const customer = {
  async createCustomer(parent, { data }, { prisma }) {
    const results = await prisma.createCustomer(data);
    const customer = await prisma.customer({ id: results.id });

    producer({ topic: 'CustomerCreate', message: { ...customer } })
    return results;
  },
  async updateCustomer(parent, args, { prisma }) {
    const results = await prisma.updateCustomer(args);
    producer
      ({
        topic: 'CustomerUpdate',
        message: args,
      })
    return results;
  },
  async deleteCustomer(parent, { where }, { prisma }) {
    const results = prisma.deleteCustomer(where);
    producer(

      {
        topic: 'CustomerDelete',
        message: where,
      },

    );
    return results;
  },
};

module.exports = { customer };
