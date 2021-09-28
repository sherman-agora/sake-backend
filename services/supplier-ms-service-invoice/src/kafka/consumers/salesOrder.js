const { prisma } = require('../../generated/prisma-client');

const updateTotalPrice = async data => {
  const invoices = await prisma.invoices({
    where: {
      salesOrderId: data.id,
    },
  });
  const invoice = invoices[0];

  return prisma.updateInvoice({
    data: {
      totalPrice: data.grandTotal,
    },
    where: {
      id: invoice.id,
    },
  });
};

module.exports = {
  updateTotalPrice,
};
