const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation');
const resolvers = require('./resolvers')
// const prisma = require('./prisma')
const { prisma } = require('./generated/prisma-client')
const consumer = require('./kafka/consumer');
const producer = require('./kafka/producer');
const schema = require('./schema')

const server = new ApolloServer({
  schema: buildFederatedSchema(schema),
  context: ({ req }) => ({
    ...req,
    prisma,
    producer,
    consumer,
  }),
  introspection: true,
  playground: true, // process.env.NODE_ENV === 'development',
  debug: true, // process.env.NODE_ENV === 'development'
})

module.exports = server;
