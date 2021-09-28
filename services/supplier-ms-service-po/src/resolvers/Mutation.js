const { purchaseOrder } = require('./Mutations/purchaseOrder');
const { purchaseOrderItem } = require('./Mutations/purchaseOrderItem');

const Mutation = {
  ...purchaseOrder,
  ...purchaseOrderItem,
};

module.exports = { Mutation };
