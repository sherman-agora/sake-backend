const kafka = require('./kafkaClient');
const { createCustomer, updateCustomer, deleteCustomer } = require('./kafka/consumers/customer');
const { createSupplier, updateSupplier, deleteSupplier } = require('./kafka/consumers/supplier');
const { createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require('./kafka/consumers/purchaseOrder');
const { createInvoice, updateInvoice, deleteInvoice } = require('./kafka/consumers/invoice');
const { createProduct, updateProduct } = require('./kafka/consumers/product');
const { createPayment } = require('./kafka/consumers/payment');
const { refreshToken } = require('./utils/refreshToken');
const { updateInvoiceFromXero } = require('./kafka/consumers/xero_invoice');

const consumer = kafka.consumer({ groupId: 'sms-xero' });
const subscribeConsumer = async params => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'CustomerCreate' });
  await consumer.subscribe({ topic: 'CustomerUpdate' });
  await consumer.subscribe({ topic: 'CustomerDelete' });
  await consumer.subscribe({ topic: 'SupplierCreate' });
  await consumer.subscribe({ topic: 'SupplierUpdate' });
  await consumer.subscribe({ topic: 'SupplierDelete' });
  await consumer.subscribe({ topic: 'ReceivePaymentCreate' });
  await consumer.subscribe({ topic: 'ProductCreate' });
  await consumer.subscribe({ topic: 'ProductDelete' });
  await consumer.subscribe({ topic: 'ProductUpdate' });
  await consumer.subscribe({ topic: 'SOWebhook' });
  await consumer.subscribe({ topic: 'PurchaseOrderCreate' });
  await consumer.subscribe({ topic: 'POUpdate' });
  await consumer.subscribe({ topic: 'SOUpdate1' });
  await consumer.subscribe({ topic: 'InvoiceCreate' });
  await consumer.subscribe({ topic: 'InvoiceUpdate' });
  await consumer.subscribe({ topic: 'InvoiceDelete' });
  await consumer.subscribe({ topic: 'XeroWebhook' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      kafka.logger().info('Message processed', {
        topic,
        partition,
        offset: message.offset,
        timestamp: message.timestamp,
        value: JSON.parse(message.value),
      });
      const args = JSON.parse(message.value);

      switch (topic) {
        case 'CustomerCreate':
          createCustomer(args);
          break;
        case 'CustomerUpdate':
          updateCustomer(args);
          break;
        case 'CustomerDelete':
          deleteCustomer(args);
          break;
        case 'SupplierCreate':
          createSupplier(args.data, args.id);
          break;
        case 'SupplierUpdate':
          updateSupplier(args.args);
          break;
        case 'SupplierDelete':
          deleteSupplier(args.where);
          break;
        case 'PurchaseOrderCreate':
          createPurchaseOrder(args.data);
          break;
        case 'POUpdate':
          updatePurchaseOrder(args);
          break;
        case 'InvoiceCreate':
          createInvoice(args);
          break;
        case 'SOUpdate1':
          updateInvoice(args);

          break;
        case 'SOWebhook':
          updateInvoice(args);
          break;
        case 'InvoiceDelete':
          // deleteInvoice(args);
          break;
        case 'InvoiceUpdate':
          updateInvoice({
            id: args.results.salesOrderId,
            state: 'CONFIRMED',
            shipmentDate: args.updateData.data.shipmentDate,
          });
          break;
        case 'ReceivePaymentCreate':
          createPayment(args);
          break;
        case 'ProductCreate':
          createProduct(args.results);
          break;
        case 'ProductUpdate':
          updateProduct(args);
          break;
        case 'XeroWebhook':
          updateInvoiceFromXero(args);
          break;
        default:
      }
    },
  });
};

subscribeConsumer().catch(e => kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack }));

module.exports = consumer;
