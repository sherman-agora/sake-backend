const { expiryDateSummary } = require('./Queries/expiryDateSummary');
const { inventoryItem } = require('./Queries/inventoryItem');
const { productSummary } = require('./Queries/productSummary');
const { warehouse } = require('./Queries/warehouse');
const { warehouseSummary } = require('./Queries/warehouseSummary');

const Query = {
  ...expiryDateSummary,
  ...inventoryItem,
  ...productSummary,
  ...warehouseSummary,
  ...warehouse,
};

module.exports = { Query };
