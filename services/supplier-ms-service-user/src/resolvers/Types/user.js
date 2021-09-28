const { prisma } = require('../../generated/prisma-client');

const User = {
  __resolveReference({ id }) {
    return prisma.user({ id });
  },

  async group({ id }, args) {
    return await prisma.user({ id }).group(args);
  },
};

module.exports = {
  User,
};
