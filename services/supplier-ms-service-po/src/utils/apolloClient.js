const { ApolloClient } = require('apollo-boost');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { PRISMA_HOST } = process.env;
const { fetch } = require('cross-fetch/polyfill');

const GATEWAY_HOST = PRISMA_HOST === 'localhost' ? 'localhost' : 'sms-gateway';
const client = new ApolloClient({
    link: createHttpLink({
        uri: `http://${GATEWAY_HOST}:4000/`,
        fetch,
    }),
    cache: new InMemoryCache(),
});

module.exports = client;