const { extractFragmentReplacements } = require('prisma-binding')

const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Warehouse } = require('./Types/Warehouse');
const { WarehouseConnection } = require('./Types/WarehouseConnection');

const resolvers = {
  Query,
  Mutation,
  Warehouse,
  WarehouseConnection
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
