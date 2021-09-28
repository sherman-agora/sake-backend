// Import kafka Client
const kafka = require("./kafkaClient");
const producer = kafka.producer();

async function kafkaProducer({ topic, message }) {
  // Message must be Json format

  await producer.connect();
  console.log("topic", topic);
  console.log("message", JSON.stringify(message));
  const kafkaProducerResponse = await producer
    .send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    })
    .then((response) => {
      kafka.logger().info(`Messages sent`, {
        response,
      });
    })
    .catch((e) =>
      kafka
        .logger()
        .error(`[example/producer] ${e.message}`, { stack: e.stack })
    );
  await producer.disconnect();
  return kafkaProducerResponse;
}
module.exports = kafkaProducer;
