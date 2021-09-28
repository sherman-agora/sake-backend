const { prisma } = require('../../generated/prisma-client');

const ReceivePayment = {
  async invoice({ id }) {
    const data = await prisma.receivePayment({ id });
    return { __typename: 'Invoice', id: data.invoiceId };
  },

  async deliveryNote({ id }) {
    const data = await prisma.receivePayment({ id });
    return { __typename: 'DeliveryNote', id: data.deliveryNoteId };
  },

  __resolveReference({ id }) {
    return prisma.receivePayment({ id });
  }
};

module.exports = {
  ReceivePayment,
};
