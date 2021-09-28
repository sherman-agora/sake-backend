const { extractFragmentReplacements } = require('prisma-binding')

const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Product } = require('./Types/Product')
const { ProductConnection } = require('./Types/ProductConnection');
const { ProductCategory } = require('./Types/ProductCategory')
const { ProductCategoryConnection } = require('./Types/ProductCategoryConnection')

const resolvers = {
  Query,
  Mutation,
  Product,
  ProductConnection,
  ProductCategory,
  ProductCategoryConnection
  // Mutation: {},
  // Subscription,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
