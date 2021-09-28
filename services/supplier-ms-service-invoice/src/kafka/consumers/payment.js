const { prisma } = require('../../generated/prisma-client');

const createReceivePayment = async data =>
  await prisma.updateInvoice({
    where: { id: data.data.invoiceId },
    data: { state: 'PAID' },
  });
module.exports = {
  createReceivePayment,
};
