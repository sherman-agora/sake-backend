const gql = require('graphql-tag');
const ApolloClient = require('apollo-boost').ApolloClient;
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

// Create the Apollo Client
const gatewayHost = process.env.API_GATEWAY || 'http://localhost:4000';
console.log('gateway:' + gatewayHost);
// const gatewayHost = 'https://petgo-api.techballogy.com';
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
    uri: gatewayHost,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: defaultOptions,
});

module.exports = { client };
