const { prisma } = require('../../generated/prisma-client');

const UserGroup = {
  __resolveReference({ id }) {
    return prisma.UserGroup({ id });
  },

  async user({ id }) {
    return await prisma.userGroup({ id }).users();
  },
};

module.exports = {
  UserGroup,
};
