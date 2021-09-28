const { prisma } = require('../../generated/prisma-client');

const Customer = {
  async deliveryNotes({ id }) {
    return prisma.deliveryNotes({ where: { customerId: id } });
  },
};

module.exports = {
  Customer,
};
