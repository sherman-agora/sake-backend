const User = {
  async salesOrders({ id }, args, { prisma }) {
    console.log(id);
    return await prisma.salesOrderUser({ id }).salesOrders(args);
  },
}

module.exports = {
  User,
}
