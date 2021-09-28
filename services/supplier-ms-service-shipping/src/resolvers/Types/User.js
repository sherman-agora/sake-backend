const User = {
  async shippings({ id }, args, context) {
    return await context.prisma.shippingUser({ id }).shippings(args);
  },
}

module.exports = {
  ShippingUser: User,
}
