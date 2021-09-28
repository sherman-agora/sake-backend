const { Phone, PaymentTermType, Contacts } = require('xero-node');

const auth = {
  async createAuth(parent, { data }, { prisma, xero }) {
    const url = data.apiUrl;
    await prisma.createAuth(data);

    const apiCall = await xero.apiCallback(url);
    await xero.setTokenSet(apiCall);
    await xero.updateTenants();
    const tokenSet = await xero.readTokenSet();
    console.log('tokenSet: ' + tokenSet);
    const tenantsId = await xero.tenants[0].tenantId;

    const results = await prisma.createXeroUser({
      accessToken: tokenSet.access_token,
      refreshToken: tokenSet.refresh_token,
      tenantId: tenantsId,
    });
    console.dir('XERO Auth Success!!');
    async function autoRefreshTokenAfter30Days() {
      console.log('refresh once');
      const validTokenSet = await xero.refreshToken();
      setTimeout(autoRefreshTokenAfter30Days, 60 * 29 * 1000, 'funky');

      // const validTokenSet = await xero.refreshToken()
    }

    const intervalObj = setInterval(() => {
      console.log('refresh once');
      const validTokenSet = xero.refreshToken();
    }, 60 * 29 * 1000);
    // setTimeout(myFunc, 24*60*60*30*1000, 'funky');

    return results;
  },
};

module.exports = { auth };
