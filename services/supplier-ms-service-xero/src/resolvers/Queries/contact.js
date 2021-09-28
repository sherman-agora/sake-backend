const contact = {
  async contacts(parent, { where }, { prisma, xero }) {
    const results = await prisma.contacts();
    return results;
  },
};

module.exports = { contact };
