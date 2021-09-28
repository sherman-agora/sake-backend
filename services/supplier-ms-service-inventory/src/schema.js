const { importSchema } = require('graphql-import');
const { gql } = require('apollo-server');

const sch = importSchema('./src/schema.graphql');

const typeDefs = gql(sch);
const { resolvers } = require('./resolvers')
// const middlewares = require('./middlewares')

const schema = [{ typeDefs, resolvers }]
// const schemaWithMiddleware = applyMiddleware(schema, ...middlewares)

module.exports = schema //schemaWithMiddleware
