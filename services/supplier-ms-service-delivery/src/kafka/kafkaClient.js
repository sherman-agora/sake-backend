const { Kafka, logLevel } = require('kafkajs');
const prettyConsoleLogger = require('./prettyConsoleLogger');

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  logCreator: prettyConsoleLogger,
  clientId: 'my-app',
  brokers: [
    // process.env.KAFKA_BROKER0,
    // process.env.KAFKA_BROKER1,
    // process.env.KAFKA_BROKER2,
    'localhost:9092',
  ],
});
module.exports = kafka;
