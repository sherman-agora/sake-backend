const { prisma } = require('../../generated/prisma-client');

const SalesOrder = {
  async deliveryNote({ id }) {
    const arr = await prisma.deliveryNotes({ where: { salesOrderId: id } });
    return arr.length > 0 ? arr[0] : null;
  },
};

module.exports = {
  SalesOrder,
};
