const xero = require('../xero_Client');

const refreshToken = async () => {
  const tenants = await xero.tenants;
  if (tenants.length > 0) {
    const id = await xero.accountingApi.getAccounts(tenants[0].tenantId);
    const tokenSet = await xero.readTokenSet();
    if (tokenSet.expired()) {
      await xero.refreshTokenUsingTokenSet(tokenSet);
    }
    return id;
  }
};
module.exports = {
  refreshToken,
};
