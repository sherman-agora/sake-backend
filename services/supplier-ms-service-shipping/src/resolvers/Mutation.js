const { shipping } = require('./Mutations/shipping');
const { shippingItem } = require('./Mutations/shippingItem');

const Mutation = {
  ...shipping,
  ...shippingItem,
};

module.exports = { Mutation };
