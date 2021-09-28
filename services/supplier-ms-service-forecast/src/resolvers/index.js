const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Product } = require('./Types/Product');

const resolvers = {
  Query,
  Mutation,
  Product,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
};
