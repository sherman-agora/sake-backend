const { prisma } = require('../../generated/prisma-client');

const user = {
  async createUser(parent, { data }) {
    return prisma.createUser(data);
  },
  updateUser(parent, args) {
    return prisma.updateUser(args);
  },
  deleteUser(parent, { where }) {
    return prisma.deleteUser(where);
  },
};

module.exports = { user };
