const producer = require('./producer');

const salesOrderWebhook = id => {
  console.log('SEND WEBHOOK TOPIC');
  return producer(
    {
      topic: 'SOWebhook',
      message: { id },
    },
  );
};

module.exports = salesOrderWebhook;
