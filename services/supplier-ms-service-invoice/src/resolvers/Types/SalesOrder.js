const { prisma } = require('../../generated/prisma-client');

const SalesOrder = {
  async invoice({ id }) {
    const results = await prisma.invoices({ where: { salesOrderId: id } });
    return results.length > 0 ? results[0] : null;
  }
};

module.exports = {
  SalesOrder,
};
