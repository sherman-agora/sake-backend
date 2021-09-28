const { prisma } = require('../../generated/prisma-client');

const userGroup = {
  async createUserGroup(parent, { data }) {
    return prisma.createUserGroup(data);
  },
  updateUserGroup(parent, args) {
    return prisma.updateUserGroup(args);
  },
  deleteUserGroup(parent, { where }) {
    return prisma.deleteUserGroup(where);
  },
};

module.exports = { userGroup };
