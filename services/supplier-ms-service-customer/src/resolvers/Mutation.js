const { customer } = require('./Mutations/customer');
const { customerGroup } = require('./Mutations/customerGroup');
const { customerShop } = require('./Mutations/customerShop');
const { customerCoupon } = require('./Mutations/customerCoupon');

const Mutation = {
  ...customer,
  ...customerGroup,
  ...customerShop,
  ...customerCoupon,
};

module.exports = { Mutation };
