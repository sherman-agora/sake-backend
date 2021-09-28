const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const createReceivePayment = async data => {
  const results = await prisma.updateSalesOrder({
    where: {
      id: data.data.salesOrderId,
    },
    data: {
      state: 'PAID',
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
  createReceivePayment,
};
