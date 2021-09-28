const { prisma } = require('../../generated/prisma-client');

const shipping = {
  async whenShippingCreated({ data }) {
    console.log('whenShippingCreated', data);
    await prisma.updatePurchaseOrder({
      where: {
        id: data.purchaseOrderId
      },
      data: {
        state: "ARRIVED"
      }
    });
  },
};

module.exports = {
  shipping,
};