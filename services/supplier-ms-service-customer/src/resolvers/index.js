const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Customer } = require('./Types/Customer');
const { CustomerConnection } = require('./Types/CustomerConnection');
const { CustomerGroup } = require('./Types/CustomerGroup');
const { CustomerGroupConnection } = require('./Types/CustomerGroupConnection');
const { CustomerShop } = require('./Types/CustomerShop');
const { CustomerShopConnection } = require('./Types/CustomerShopConnection');
const { CustomerCoupon } = require('./Types/CustomerCoupon');
const { CustomerCouponConnection } = require('./Types/CustomerCouponConnection');

const resolvers = {
  Query,
  Mutation,
  Customer,
  CustomerConnection,
  CustomerGroup,
  CustomerGroupConnection,
  CustomerShop,
  CustomerShopConnection,
  CustomerCoupon,
  CustomerCouponConnection,
  // Mutation: {},
  // Subscription,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
