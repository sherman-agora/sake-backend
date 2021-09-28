const { prisma } = require('../../generated/prisma-client');

const DeliveryNote = {
  async receivePayment({ id }) {
    const arr = await prisma.receivePayments({ where: { deliveryNoteId: id } });
    return arr.length > 0 ? arr[0] : null;
  },
};

module.exports = {
  DeliveryNote,
};
