const { createCustomer, updateCustomer, deleteCustomer } = require('./kafka/consumers/customer');
const { createProduct, updateProduct, deleteProduct } = require('./kafka/consumers/product');
const { updateSalesOrder } = require('./kafka/consumers/salesOrder');

const kafka = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'sms-web-integration' });
const subscribeConsumer = params => {
  const kafkaConnect = consumer.connect();
  const customerCreateConnect = consumer.subscribe({ topic: 'CustomerCreate' });
  const customerUpdateConnect = consumer.subscribe({ topic: 'CustomerUpdate' });
  const customerDeleteConnect = consumer.subscribe({ topic: 'CustomerDelete' });
  const customerShopCreateConnect = consumer.subscribe({ topic: 'CustomerShopCreate' });
  const customerShopUpdateConnect = consumer.subscribe({ topic: 'CustomerShopUpdate' });
  const customerShopDeleteConnect = consumer.subscribe({ topic: 'CustomerShopDelete' });
  const productCreateConnect = consumer.subscribe({ topic: 'ProductCreate' });
  const productUpdateConnect = consumer.subscribe({ topic: 'ProductUpdate' });
  const productDeleteConnect = consumer.subscribe({ topic: 'ProductDelete' });
  const soWebhookConnect = consumer.subscribe({ topic: 'SOWebhook' });

  Promise.all([
    kafkaConnect,
    customerCreateConnect,
    customerUpdateConnect,
    customerDeleteConnect,
    customerShopCreateConnect,
    customerShopUpdateConnect,
    customerShopDeleteConnect,
    productCreateConnect,
    productUpdateConnect,
    productDeleteConnect,
    soWebhookConnect,
  ])
    .then(value => {
      console.log('Start to consumer');
      consumer.run({
        eachMessage: ({ topic, partition, message }) => {
          kafka.logger().info('Message processed', {
            topic,
            partition,
            offset: message.offset,
            timestamp: message.timestamp,
            value: JSON.parse(message.value),
          });
          const args = JSON.parse(message.value);

          // switch (topic) {
          //   case 'CustomerCreate':
          //     createCustomer(args, 'CreateCustomer');
          //     break;
          //   case 'CustomerUpdate':
          //     updateCustomer(args, 'UpdateCustomer');
          //     break;
          //   case 'CustomerDelete':
          //     deleteCustomer(args, 'DeleteCustomer');
          //     break;
          //   case 'CustomerShopCreate':
          //     createCustomer(args, 'CreateCustomerShop');
          //     break;
          //   case 'CustomerShopUpdate':
          //     updateCustomer(args, 'UpdateCustomerShop');
          //     break;
          //   case 'CustomerShopDelete':
          //     deleteCustomer(args, 'DeleteCustomerShop');
          //     break;
          //   case 'ProductCreate':
          //     createProduct(args, 'ProductCreate');
          //     break;
          //   case 'ProductUpdate':
          //     updateProduct(args, 'ProductUpdate');
          //     break;
          //   case 'ProductDelete':
          //     deleteProduct(args, 'ProductDelete');
          //     break;
          //   case 'SOWebhook':
          //     updateSalesOrder(args, 'SalesOrderUpdate');
          //     break;
          //   default:
          // }
        },
      });
    })
    .catch(e => kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack }));
};

subscribeConsumer();

module.exports = consumer;
