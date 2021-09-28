const xero = require('../../xero_Client');

const disconnect = {
  async disconnect() {
    console.log('disconnect...');
    await xero.disconnect(xero.tenants[0].id);
  },
};

module.exports = {
  disconnect,
};
