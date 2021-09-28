const { auth } = require('./Mutations/auth');
const { redirect } = require('./Mutations/redirect');
const { disconnect } = require('./Mutations/disconnect');

const Mutation = {
  ...auth,
  ...redirect,
  ...disconnect,
};

module.exports = { Mutation };
