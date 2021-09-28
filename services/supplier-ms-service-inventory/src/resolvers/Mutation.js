const { expiryDateSummary } = require('./Mutations/expiryDateSummary');
const { inventoryItem } = require('./Mutations/inventoryItem');
const { productSummary } = require('./Mutations/productSummary');
const { warehouse } = require('./Mutations/warehouse');
const { warehouseManagement } = require('./Mutations/warehouseManagement');
const { warehouseSummary } = require('./Mutations/warehouseSummary');

const Mutation = {
  ...expiryDateSummary,
  ...inventoryItem,
  ...productSummary,
  ...warehouse,
  ...warehouseManagement,
  ...warehouseSummary,
};

module.exports = { Mutation };
