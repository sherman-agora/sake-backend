const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { prisma } = require('./generated/prisma-client');
const schema = require('./schema');

const server = new ApolloServer({
  schema: buildFederatedSchema(schema),
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
  introspection: true,
  playground: true, // process.env.NODE_ENV === 'development',
  debug: true, // process.env.NODE_ENV === 'development'
});

module.exports = server;
