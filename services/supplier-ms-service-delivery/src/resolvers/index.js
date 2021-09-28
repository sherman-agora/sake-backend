const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Customer } = require('./Types/Customer');
const { DeliveryNote } = require('./Types/DeliveryNote');
const { DeliveryNoteConnection } = require('./Types/DeliveryNoteConnection');
const { DeliveryItem } = require('./Types/DeliveryItem');
const { DeliveryItemConnection } = require('./Types/DeliveryItemConnection');
const { InventoryItem } = require('./Types/InventoryItem');
const { Invoice } = require('./Types/Invoice');
const { Product } = require('./Types/Product');
const { SalesOrder } = require('./Types/SalesOrder');

const resolvers = {
  Query,
  Mutation,
  Customer,
  DeliveryNote,
  DeliveryNoteConnection,
  DeliveryItem,
  DeliveryItemConnection,
  InventoryItem,
  Invoice,
  Product,
  SalesOrder,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
