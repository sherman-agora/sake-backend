const xero_node = require('xero-node');

const client_id = '3B176454BA904123BC4A6835FF6DAF80';
const client_secret = 'Whruwc3CrC50b5Gn0HePezW4ppBhqNY8qn-NO5wmIrCYvFTj';
const redirectUri = 'http://localhost:3000/Callback';
console.log('redirectUri: ', redirectUri);
const scopes = 'openid profile email accounting.transactions accounting.settings offline_access accounting.contacts';

const xero = new xero_node.XeroClient({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUris: [redirectUri],
  scopes: scopes.split(' '),
});

module.exports = xero;
