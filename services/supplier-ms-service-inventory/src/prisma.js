// src/prisma.js
const Bindings = require('prisma-binding')
const Client = require('./generated/prisma-client')
const { fragmentReplacements } = require('./resolvers')

module.exports = {
  client: new Client.Prisma({
    fragmentReplacements,
    endpoint: `http://${process.env.PRISMA_HOST}:${process.env.PRISMA_PORT}/supplierms-inventory/dev`,
    secret: process.env.PRISMA_SECRET,
    debug: false
  }),
  bindings: new Bindings.Prisma({
    typeDefs: 'src/prisma.graphql',
    fragmentReplacements,
    endpoint: `http://${process.env.PRISMA_HOST}:${process.env.PRISMA_PORT}/supplierms-inventory/dev`,
    secret: process.env.PRISMA_SECRET,
    debug: false
  })
}
