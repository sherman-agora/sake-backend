const { extractFragmentReplacements } = require('prisma-binding')

const { Query } = require('./Query')
const { Mutation } = require('./Mutation');
const { PurchaseOrder } = require('./Types/PurchaseOrder');
const { PurchaseOrderConnection } = require('./Types/PurchaseOrderConnection');
const { Product } = require('./Types/Product');
const { PurchaseOrderItemConnection } = require('./Types/PurchaseOrderItemConnection');
const { PurchaseOrderItem } = require('./Types/PurchaseOrderItem');
const { Supplier } = require('./Types/Supplier')
// const { PurchaseOrderUser } = require('./Types/PurchaseOrderUser');

const resolvers = {
  Query,
  Mutation,
  PurchaseOrder,
  PurchaseOrderConnection,
  Product,
  PurchaseOrderItemConnection,
  PurchaseOrderItem,
  Supplier,
}

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
