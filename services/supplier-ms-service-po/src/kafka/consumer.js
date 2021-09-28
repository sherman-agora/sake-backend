const kafka = require('./kafkaClient')
const { shipping } = require('./consumers/shipping');

const consumer = kafka.consumer({ groupId: "sms-po" });
const subscribeConsumer = async (params) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "SPCreate", });

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
        case 'SPCreate':
          shipping.whenShippingCreated(args);
          break;
        default:
          break;
      }
    }
  })
}

subscribeConsumer().catch((e) =>
  kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack })
);


module.exports = consumer;
