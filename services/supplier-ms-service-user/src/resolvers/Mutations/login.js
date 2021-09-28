const { prisma } = require('../../generated/prisma-client');

const login = {
  async login(parent, { data }) {
    return prisma.createUser(data);
  },
};

module.exports = { user };
