const { createCustomer, updateCustomer, deleteCustomer } = require('./consumers/customer');
const { updateTotalPrice } = require('./consumers/salesOrder');
const { createDeliveryNote } = require('./consumers/deliveryNote');
const { createReceivePayment } = require('./consumers/payment');

const kafka = require('./kafkaClient')
const consumer = kafka.consumer({ groupId: "sms-invoice" });
const subscribeConsumer = async (params) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "SOUpdate1", });
  await consumer.subscribe({ topic: "DeliveryNoteCreate", });
  await consumer.subscribe({ topic: "ReceivePaymentCreate", });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      kafka.logger().info("Message processed", {
        topic,
        partition,
        offset: message.offset,
        timestamp: message.timestamp,
        value: JSON.parse(message.value),
      });
      const args = JSON.parse(message.value)
      switch (topic) {
        case 'SOUpdate1':
          updateTotalPrice(args);
          break;
        case 'DeliveryNoteCreate':
          createDeliveryNote(args);
          break;
        case 'ReceivePaymentCreate':
          createReceivePayment(args);
          break;//   break;
        default:
      }

    }
  })
}
subscribeConsumer().catch((e) =>
  kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack })
);

module.exports = consumer;
