const { prisma } = require('../../generated/prisma-client');

const Invoice = {
  async salesOrder({ id }) {
    const data = await prisma.invoice({ id });
    return { __typename: 'SalesOrder', id: data.salesOrderId };
  },

  // async user({ id }) {
  //   const data = await prisma.invoice({ id });
  //   return { __typename: 'User', id: data.userId };
  // },

  __resolveReference({ id }) {
    return prisma.invoice({ id });
  }
}

module.exports = {
  Invoice,
}
