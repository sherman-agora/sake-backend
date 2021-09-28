const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { Invoice } = require('./Types/Invoice');
const { DeliveryNote } = require('./Types/DeliveryNote');
const { ReceivePayment } = require('./Types/ReceivePayment');
const { ReceivePaymentConnection } = require('./Types/ReceivePaymentConnection');

const resolvers = {
  Query,
  Mutation,
  ReceivePayment,
  ReceivePaymentConnection,
  DeliveryNote,
  Invoice,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
