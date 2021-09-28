const { prisma } = require('../../generated/prisma-client');

const Invoice = {
  async deliveryNote({ id }) {
    const arr = await prisma.deliveryNotes({ where: { invoiceId: id } });
    return arr.length > 0 ? arr[0] : null;
  },
};

module.exports = {
  Invoice,
};
