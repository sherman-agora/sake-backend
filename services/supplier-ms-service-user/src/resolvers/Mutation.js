const { user } = require('./Mutations/user');
const { userGroup } = require('./Mutations/userGroup');

const Mutation = {
  ...user,
  ...userGroup,
};

module.exports = { Mutation };
