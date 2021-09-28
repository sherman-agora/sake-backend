const redirect = {
  async createRedirect(parent, { data }, { prisma, xero }) {
    console.log('createing Redirect');
    try {
      await xero.initialize();
      const consentUrl = await xero.buildConsentUrl();
      console.log('consentUrl::' + consentUrl);
      const results = await prisma.createRedirect({
        redirectUrl: consentUrl,
      });
      return results;
    } catch (error) {
      console.log('createXeroAuthError' + error);
      return error;
    }
  },
};

module.exports = { redirect };
