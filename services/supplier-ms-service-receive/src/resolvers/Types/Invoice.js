const { prisma } = require('../../generated/prisma-client');

const Invoice = {
  async receivePayment({ id }) {
    const arr = await prisma.receivePayments({ where: { invoiceId: id } });
    return arr.length > 0 ? arr[0] : null;
  },
};

module.exports = {
  Invoice,
};
