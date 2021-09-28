const auth = {
  async auths(parent, { where }, { prisma }) {
    const results = await prisma.auths();
    return results;
  },
};

module.exports = { auth };
