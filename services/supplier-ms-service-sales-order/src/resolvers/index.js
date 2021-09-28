const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
// const { User } = require('./Types/SalesOrderUser');
const { Shop } = require('./Types/Shop');
const { Product } = require('./Types/Product');
const { SalesOrderItem } = require('./Types/SalesOrderItem');
const { SalesOrderItemConnection } = require('./Types/SalesOrderItemConnection');
const { SalesOrder } = require('./Types/SalesOrder');
const { SalesOrderConnection } = require('./Types/SalesOrderConnection');

const resolvers = {
  Query,
  Mutation,
  Shop,
  Product,
  SalesOrderItem,
  SalesOrderItemConnection,
  SalesOrder,
  SalesOrderConnection,
  // Mutation: {},
  // Subscription,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
