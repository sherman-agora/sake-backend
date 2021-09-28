require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'supplier', url: `http://${process.env.SUPPLIER_HOST}/` },
    { name: 'product', url: `http://${process.env.PRODUCT_HOST}/` },
    { name: 'po', url: `http://${process.env.PURCHASE_ORDER_HOST}/` },
    { name: 'inventory', url: `http://${process.env.INVENTORY_HOST}/` },
    { name: 'customer', url: `http://${process.env.CUSTOMER_HOST}/` },
    { name: 'sales-order', url: `http://${process.env.SALES_ORDER_HOST}/` },
    { name: 'invoice', url: `http://${process.env.INVOICE_HOST}/` },
    { name: 'delivery', url: `http://${process.env.DELIVERY_HOST}/` },
    { name: 'shipping', url: `http://${process.env.SHIPPING_HOST}/` },
    { name: 'forecast', url: `http://${process.env.FORECAST_HOST}/` },
    { name: 'xero', url: `http://${process.env.XERO_HOST}/` },
    { name: 'receive', url: `http://${process.env.RECEIVE_HOST}/` },
    { name: 'user', url: `http://${process.env.USER_HOST}/` },
  ],
  debug: true,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  tracing: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
