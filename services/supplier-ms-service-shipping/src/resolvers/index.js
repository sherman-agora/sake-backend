const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Shipping } = require('./Types/Shipping');
const { ShippingConnection } = require('./Types/ShippingConnection');
const { Product } = require('./Types/Product');
const { Warehouse } = require('./Types/Warehouse');
const { ShippingItemConnection } = require('./Types/ShippingItemConnection');
const { ShippingItem } = require('./Types/ShippingItem');
const { PurchaseOrder } = require('./Types/PurchaseOrder');

const resolvers = {
  Query,
  Mutation,
  Shipping,
  ShippingConnection,
  Product,
  ShippingItemConnection,
  ShippingItem,
  PurchaseOrder,
  Warehouse,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
};
