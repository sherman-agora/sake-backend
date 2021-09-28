const { salesOrderItem } = require('./Mutations/salesOrderItem');
const { salesOrder } = require('./Mutations/salesOrder');

const Mutation = {
  ...salesOrderItem,
  ...salesOrder,
};

module.exports = { Mutation };
