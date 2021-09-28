const xero = require('../../xero_Client');

const checking = {
  async checking() {
    let status;
    console.log('checking...');
    const tenants = await xero.tenants;
    try {
      await xero.accountingApi.getAccounts(tenants[0].tenantId);
      status = 'AUTH';
    } catch (err) {
      // await refreshToken();
      // checking();
      status = 'UNAUTH';
    }
    return status;
  },
};

module.exports = {
  checking,
};
