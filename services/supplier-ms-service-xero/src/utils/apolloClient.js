const { ApolloClient } = require('apollo-boost');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { PRISMA_HOST } = process.env;
const { fetch } = require('cross-fetch/polyfill');

// const GATEWAY_HOST = PRISMA_HOST === 'localhost' ? 'localhost' : 'sms-gateway';
const GATEWAY_HOST = 'localhost';
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
const client = new ApolloClient({
  link: createHttpLink({
    uri: `http://${GATEWAY_HOST}:4000/`,
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

module.exports = client;
