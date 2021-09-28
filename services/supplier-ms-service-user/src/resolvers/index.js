const { extractFragmentReplacements } = require('prisma-binding');

const { Query } = require('./Query');
const { Mutation } = require('./Mutation');
const { User } = require('./Types/user');
const { UserGroup } = require('./Types/userGroup');

const resolvers = {
  Query,
  Mutation,
  User,
  UserGroup,
};

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers),
};
