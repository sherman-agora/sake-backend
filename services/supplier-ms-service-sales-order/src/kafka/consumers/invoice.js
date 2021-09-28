const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const createInvoice = async data => {
  const results = await prisma.updateSalesOrder({
    where: {
      id: data.salesOrderId,
    },
    data: {
      state: 'INVOICED',
    },
  });
  producer(
    {
      topic: 'SOWebhook',
      message: { id: results.id },
    },
  );

  return results;
};

module.exports = {
  createInvoice,
};
