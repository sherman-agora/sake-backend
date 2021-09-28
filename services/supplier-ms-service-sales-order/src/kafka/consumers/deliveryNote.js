const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const createDeliveryNote = async data => {
  const results = await prisma.updateSalesOrder({
    where: {
      id: data.data.salesOrderId,
    },
    data: {
      state: 'DELIVERED',
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
  createDeliveryNote,
};
