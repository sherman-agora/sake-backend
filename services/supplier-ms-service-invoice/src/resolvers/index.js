const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Invoice } = require('./Types/Invoice');
const { InvoiceConnection } = require('./Types/InvoiceConnection');
const { SalesOrder } = require('./Types/SalesOrder');

const resolvers = {
  Query,
  Mutation,
  Invoice,
  InvoiceConnection,
  SalesOrder,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
};
