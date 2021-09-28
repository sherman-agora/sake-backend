const { prisma } = require('../../generated/prisma-client');

const changeIncomingQuantity = async (incomingQuantity, productId) => {
  const productSummary = await prisma.productSummary({ productId });
  if (!productSummary) {
    return await prisma.createProductSummary({
      productId,
      incomingQuantity,
      outgoingQuantity: 0,
      quantity: 0,
    });
  }

  return await prisma.updateProductSummary({
    where: { productId },
    data: {
      incomingQuantity: productSummary.incomingQuantity + incomingQuantity,
    },
  });
};

const approvedPOStates = ['APPROVED', 'SENT', 'ACKED', 'CONFIRMED'];
const po = {
  async whenPurchaseOrderCreated({ data }) {
    console.log('inventory consume po', data);
    if (approvedPOStates.includes(data.state)) {
      return Promise.all(data.products.map(p => changeIncomingQuantity(p.quantity, p.productId))).catch(e =>
        console.log('creating error', e)
      );
    }
  },

  async whenPOUpdated({ prevData, data }) {
    if (approvedPOStates.includes(prevData.state)) {
      await Promise.all(prevData.products.map(p => changeIncomingQuantity(-p.quantity, p.productId))).catch(e =>
        console.log('updating error', e)
      );
    }
    if (approvedPOStates.includes(data.state)) {
      await Promise.all(data.products.map(p => changeIncomingQuantity(p.quantity, p.productId))).catch(e =>
        console.log('updating error', e)
      );
    }
  },

  async whenPurchaseOrderDeleted({ data }) {
    if (approvedPOStates.includes(data.state)) {
      await Promise.all(data.products.map(p => changeIncomingQuantity(-p.quantity, p.productId)));
    }
  },
};

module.exports = {
  po,
};
