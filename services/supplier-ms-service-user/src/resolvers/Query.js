const Query = {
  user(parent, { where }, { prisma }) {
    return prisma.user(where);
  },
  users(parent, args, { prisma }) {
    console.log('args: ', args);
    return prisma.users(args);
  },
  async usersConnection(parent, args, { prisma }) {
    const resulte = await prisma.usersConnection(args);
    resulte.aggregate = await prisma.usersConnection(args).aggregate();
    return resulte;
  },
  userGroup(parent, { where }, { prisma }) {
    return prisma.userGroup(where);
  },
  userGroups(parent, args, { prisma }) {
    console.log('args: ', args);
    return prisma.userGroups(args);
  },
  async userGroupsConnection(parent, args, { prisma }) {
    const resulte = await prisma.userGroupsConnection(args);
    resulte.aggregate = await prisma.userGroupsConnection(args).aggregate();
    return resulte;
  },
};

module.exports = { Query };
