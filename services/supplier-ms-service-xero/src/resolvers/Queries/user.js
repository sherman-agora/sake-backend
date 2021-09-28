const xeroUser = {
  async xeroUser(parent, { where }, { prisma, xero }) {
    const results = await prisma.xeroUser();
    return results;
  },
};

module.exports = { xeroUser };
