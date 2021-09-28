const kafka = require('./kafkaClient')

const consumer = kafka.consumer({ groupId: "sms-receive" });
const subscribeConsumer = async (params) => {
  await consumer.connect();
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
    }
  })
}
subscribeConsumer().catch((e) =>
  kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack })
);

module.exports = consumer;
