const customerShop = {
    customerShop(parent, { where }, { prisma }) {
      return prisma.customerShop(where);
    },
    customerShops(parent, args, {prisma}) {
      return prisma.customerShops(args);
    },
    async customerShopsConnection(parent, args, {prisma}) {
      const results = await prisma.customersConnection(args);
      results.aggregate = await prisma.customersConnection(args).aggregate();
      return results;
    },
  };
  
  module.exports = { customerShop };
  