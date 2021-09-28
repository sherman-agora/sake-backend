const { prisma } = require('../../generated/prisma-client');

const createDeliveryNote = async data =>
  await prisma.updateInvoice({
    where: { id: data.data.invoiceId },
    data: { state: 'DELIVERED' },
  });
module.exports = {
  createDeliveryNote,
};
