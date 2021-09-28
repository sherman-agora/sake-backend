const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation');
const resolvers = require('./resolvers')
// const prisma = require('./prisma')
const { prisma } = require('./generated/prisma-client')
const schema = require('./schema')
const consumer = require('./consumer');
const xero = require('./xero_Client')
require('./consumer')

const server = new ApolloServer({
  schema: buildFederatedSchema(schema),
  context: ({ req }) => ({
    ...req,
    prisma,
    consumer,
    xero
  }),
  introspection: true,
  playground: true, // process.env.NODE_ENV === 'development',
  debug: true, // process.env.NODE_ENV === 'development'
})

module.exports = server;
