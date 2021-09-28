const { prisma } = require('../../generated/prisma-client');

const updatePurchaseOrderTotalPrice = async (purchaseOrderId) => {
  const items = await prisma.purchaseOrderItems({
    where: {
      purchaseOrder: { id: purchaseOrderId },
    },
  });
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
  return prisma.updatePurchaseOrder({
    data: { totalPrice },
    where: { id: purchaseOrderId },
  });
};

const purchaseOrderItem = {
  async createPurchaseOrderItem(parent, { data }) {
    // eslint-disable-next-line no-param-reassign
    data.totalPrice = data.price * data.quantity;
    const results = await prisma.createPurchaseOrderItem(data);
    await updatePurchaseOrderTotalPrice(data.purchaseOrder.connect.id);
    return results;
  },
  async updatePurchaseOrderItem(parent, args) {
    const item = await prisma.purchaseOrderItem(args.where);
    const p = args.data.price || item.price;
    const q = args.data.quantity || item.quantity;
    // eslint-disable-next-line no-param-reassign
    args.data.totalPrice = p * q;
    const purchaseOrder = await prisma.purchaseOrderItem(args.where).purchaseOrder();
    const results = await prisma.updatePurchaseOrderItem(args);
    await updatePurchaseOrderTotalPrice(purchaseOrder.id);
    return results;
  },
  async deletePurchaseOrderItem(parent, { where }) {
    const purchaseOrder = await prisma.purchaseOrderItem(where).purchaseOrder();
    const results = await prisma.deletePurchaseOrderItem(where);
    await updatePurchaseOrderTotalPrice(purchaseOrder.id);
    return results;
  },
};

module.exports = { purchaseOrderItem };
