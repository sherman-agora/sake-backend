const { po } = require('./consumers/po');
const { shipping } = require('./consumers/shipping');
const { salesOrder } = require('./consumers/salesOrder');
const { deliveryNote } = require('./consumers/deliveryNote');
const kafka = require('./kafkaClient')

const consumer = kafka.consumer({ groupId: "sms-inventory" });
const subscribeConsumer = async (params) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "PurchaseOrderCreate", });
  await consumer.subscribe({ topic: "InvoiceCreate", });
  await consumer.subscribe({ topic: "POUpdate", });
  await consumer.subscribe({ topic: "PurchaseOrderDelete", });
  await consumer.subscribe({ topic: "SPCreate", });
  await consumer.subscribe({ topic: "ShippingUpdate", });
  await consumer.subscribe({ topic: "ShippingDelete", });
  await consumer.subscribe({ topic: "SOCreate", });
  await consumer.subscribe({ topic: "DeliveryNoteCreate", });
  await consumer.subscribe({ topic: "DeliveryNoteUpdate", });
  await consumer.subscribe({ topic: "DeliveryItemDelete", });
  await consumer.subscribe({ topic: "SalesOrderItemCreate", });
  await consumer.subscribe({ topic: "SalesOrderItemUpdate", });
  await consumer.subscribe({ topic: "SalesOrderItemDelete", });
  await consumer.subscribe({ topic: "CheckKafka", });

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
      console.log('topic', topic)
      switch (topic) {
        case 'PurchaseOrderCreate':
          po.whenPurchaseOrderCreated(args);
          break;
        case 'POUpdate':
          po.whenPOUpdated(args);
          break;
        case 'PurchaseOrderDelete':
          po.whenPurchaseOrderDeleted(args);
          break;
        case 'SPCreate':
          shipping.whenShippingCreated(args);
          break;
        case 'ShippingUpdate':
          shipping.whenShippingUpdated(args);
          break;
        case 'ShippingDelete':
          shipping.whenShippingDeleted(args);
          break;
        case 'SOCreate':
          salesOrder.whenSalesOrderCreated(args);
          break;
        case 'SalesOrderItemCreate':
          salesOrder.whenSalesOrderItemCreated(args);
          break;
        case 'SalesOrderItemUpdate':
          salesOrder.whenSalesOrderItemUpdated(args);
          break;
        case 'SalesOrderItemDelete':
          salesOrder.whenSalesOrderItemDeleted(args);
          break;
        case 'DeliveryNoteCreate':
          deliveryNote.deliveryItem(args.data);
          break;
        case 'DeliveryNoteUpdate':
          deliveryNote.updateDeliveryItem(args);
          break;
        case 'DeliveryItemDelete':
          deliveryNote.whenDeleteDeliveryNote(args);
          break;
        case 'CheckKafka':
          console.log('CheckKafka Ready!!');
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
