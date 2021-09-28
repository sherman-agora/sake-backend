const { prisma } = require('../../generated/prisma-client');
const CustomerShop = {
    async customer({ id }, args) {
      return await prisma.customerShop({ id }).customer(args);
    },
  
    async __resolveReference({ id }, { fetchCustomerById, where }) {
      console.log('__resolveReference', fetchCustomerById, where, id, prisma);
      return prisma.customerShop({id});
    }
  };
  
  module.exports = {
    CustomerShop,
  };
  