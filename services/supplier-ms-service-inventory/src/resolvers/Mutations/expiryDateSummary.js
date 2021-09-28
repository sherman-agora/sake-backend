const { prisma } = require('../../generated/prisma-client');

const expiryDateSummary = {
  async createExpiryDateSummary(parent, { data }) {
    const results = await prisma.createExpiryDateSummary(data);
    return results;
  },
  async updateExpiryDateSummary(parent, args) {
    const results = await prisma.updateExpiryDateSummary(args);
    return results;
  },
  async deleteExpiryDateSummary(parent, { where }) {
    const results = await prisma.deleteExpiryDateSummary(where);
    return results;
  },
};

module.exports = { expiryDateSummary };
