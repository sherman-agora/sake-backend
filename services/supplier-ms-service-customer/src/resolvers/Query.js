const { customer } = require('./Queries/customer');
const { customerGroup } = require('./Queries/customerGroup');
const { customerShop } = require('./Queries/customerShop');
const { customerCoupon } = require('./Queries/customerCoupon');

const Query = {
  ...customer,
  ...customerGroup,
  ...customerShop,
  ...customerCoupon,
};

module.exports = { Query };
