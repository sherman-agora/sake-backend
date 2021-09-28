const { receivePayment } = require('./Queries/receivePayment');

const Query = {
  ...receivePayment,
};

module.exports = { Query };
