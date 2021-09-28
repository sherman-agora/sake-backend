const kafka = require('./kafkaClient')

const consumer = kafka.consumer({ groupId: "sms-forecast" });
const subscribeConsumer = async (params) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "ProductCreate", });
  await consumer.subscribe({ topic: "ProductUpdate", });
  await consumer.subscribe({ topic: "ProductDelete", });
  await consumer.subscribe({ topic: "WarehouseIn", });
  await consumer.subscribe({ topic: "DeliveryNoteCreate", });
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
        case 'ProductCreate':
          product.createProduct(args);
          break;
        case 'ProductUpdate':
          product.updateProduct(args);
          break;
        case 'ProductDelete':
          product.deleteProduct(args);
          break;
        default:
      }
    }
  })
}


subscribeConsumer().catch((e) =>
  kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack })
);

module.exports = consumer;
