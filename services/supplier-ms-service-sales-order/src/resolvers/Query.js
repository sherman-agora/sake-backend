const { salesOrder } = require('./Queries/salesOrder');
const { salesOrderItem } = require('./Queries/salesOrderItem');


const Query = {
  ...salesOrder,
  ...salesOrderItem,
}

module.exports = { Query }
