const { prisma } = require('../../generated/prisma-client');

const DeliveryNote = {
  async items({ id }, args) {
    return prisma.deliveryNote({ id }).items(args);
  },

  async salesOrder({ id }) {
    const data = await prisma.deliveryNote({ id });
    return { __typename: 'SalesOrder', id: data.salesOrderId };
  },

  async invoice({ id }) {
    const data = await prisma.deliveryNote({ id });
    return { __typename: 'Invoice', id: data.invoiceId };
  },

  async customer({ id }) {
    const data = await prisma.deliveryNote({ id });
    return data.customerId ? { __typename: 'Customer', id: data.customerId } : null;
  },

  __resolveReference({ id }) {
    return prisma.deliveryNote({ id });
  },
};

module.exports = {
  DeliveryNote,
};
