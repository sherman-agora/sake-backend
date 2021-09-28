const User = {
  async purchaseOrders({ id }, args, context) {
    return await context.prisma.purchaseOrderUser({ id }).purchaseOrders(args);
  },
}

module.exports = {
  PurchaseOrderUser: User,
}
