const { extractFragmentReplacements } = require('prisma-binding')

const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Supplier } = require('./Types/Supplier')
const { SupplierConnection } = require('./Types/SupplierConnection')

const resolvers = {
  Query,
  Mutation,
  Supplier,
  SupplierConnection,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
