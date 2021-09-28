const Query = {
  purchaseOrderSupplier(parent, { where }, { prisma }) {
    return prisma.purchaseOrderSupplier(where);
  },
  purchaseOrderSuppliers(parent, args, { prisma }) {
    return prisma.purchaseOrderSuppliers(args);
  },
  purchaseOrderUser(parent, { where }, { prisma }) {
    return prisma.purchaseOrderUser(where);
  },
  purchaseOrderUsers(parent, args, { prisma }) {
    return prisma.purchaseOrderUsers(args);
  },
  purchaseOrder(parent, { where }, { prisma }) {
    return prisma.purchaseOrder(where);
  },
  purchaseOrders(parent, args, { prisma }) {
    return prisma.purchaseOrders(args);
  },
  async purchaseOrdersConnection(parent, args, { prisma }) {
    const results = await prisma.purchaseOrdersConnection(args);
    results.aggregate = await prisma.purchaseOrdersConnection(args).aggregate();
    return results;
  },
  purchaseOrderItem(parent, { where }, { prisma }) {
    return prisma.purchaseOrderItem(where);
  },
  purchaseOrderItems(parent, args, { prisma }) {
    return prisma.purchaseOrderItems(args);
  },
  async purchaseOrderItemsConnection(parent, args, { prisma }) {
    const results = await prisma.purchaseOrderItemsConnection(args);
    results.aggregate = await prisma.purchaseOrderItemsConnection(args).aggregate();
    return results;
  },
};

module.exports = { Query };
