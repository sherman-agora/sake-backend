const { invoice } = require('./Mutations/invoice');

const Mutation = {
  ...invoice,
};

module.exports = { Mutation };
