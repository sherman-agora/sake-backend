// Import kafka Client
const kafka = require('./kafkaClient');
const producer = kafka.producer();

function kafkaProducer({ topic, message }) {
  // Message must be Json format

  const connection = producer.connect();
  console.log('topic', topic);
  console.log('message', message);
  const kafkaProducerResponse = producer
    .send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    })
    .then(response => {
      kafka.logger().info(`Messages sent`, {
        response,
      });
    })
    .catch(e => kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack }));
  const disconnect = producer.disconnect();
  Promise.all([connection, kafkaProducerResponse, disconnect])
    .then(() => {
      console.log('Produce Message Success');
    })
    .catch(e => console.log('e', e));
}
module.exports = kafkaProducer;
