const { deliveryNote } = require('./Mutations/deliveryNote');
const { deliveryItem } = require('./Mutations/deliveryItem');

const Mutation = {
  ...deliveryNote,
  ...deliveryItem,
};

module.exports = { Mutation };
