const { prisma } = require('../../generated/prisma-client');

const ReceivePaymentConnection = {
  aggregate: (parent, args) => {
    return prisma.receivePaymentsConnection(args).aggregate();
  },
};

module.exports = {
  ReceivePaymentConnection,
};
