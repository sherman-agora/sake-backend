const { receivePayment } = require('./Mutations/receivePayment');

const Mutation = {
  ...receivePayment,
};

module.exports = { Mutation };
