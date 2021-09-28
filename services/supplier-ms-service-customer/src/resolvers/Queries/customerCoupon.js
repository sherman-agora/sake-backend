const customerCoupon = {
  customerCoupon(parent, { where }, { prisma }) {
    return prisma.customerCoupon(where);
  },
  customerCoupons(parent, args, { prisma }) {
    return prisma.customerCoupons(args);
  },
  async customerCouponsConnection(parent, args, { prisma }) {
    const results = await prisma.customerCouponsConnection(args);
    results.aggregate = await prisma.customerCouponsConnection(args).aggregate();
    return results;
  },
};

module.exports = { customerCoupon };
