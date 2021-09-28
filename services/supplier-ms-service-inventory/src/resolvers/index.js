const { extractFragmentReplacements } = require('prisma-binding');
const { Mutation } = require('./Mutation');
const { Query } = require('./Query');
const { DeliveryNote } = require('./Types/DeliveryNote');
const { ExpiryDateSummary } = require('./Types/ExpiryDateSummary');
const { ExpiryDateSummaryConnection } = require('./Types/ExpiryDateSummaryConnection');
const { InventoryItem } = require('./Types/InventoryItem');
const { InventoryItemConnection } = require('./Types/InventoryItemConnection');
const { Product } = require('./Types/Product');
const { ProductSummary } = require('./Types/ProductSummary');
const { ProductSummaryConnection } = require('./Types/ProductSummaryConnection');
const { PurchaseOrder } = require('./Types/PurchaseOrder');
const { Warehouse } = require('./Types/Warehouse');
const { WarehouseConnection } = require('./Types/WarehouseConnection');
const { WarehouseSummary } = require('./Types/WarehouseSummary');
const { WarehouseSummaryConnection } = require('./Types/WarehouseSummaryConnection');
const resolvers = {
  Query,
  Mutation,
  DeliveryNote,
  ExpiryDateSummary,
  ExpiryDateSummaryConnection,
  InventoryItem,
  InventoryItemConnection,
  Product,
  ProductSummary,
  ProductSummaryConnection,
  PurchaseOrder,
  Warehouse,
  WarehouseConnection,
  WarehouseSummary,
  WarehouseSummaryConnection,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
