const salesOrderItem = {
    salesOrderItem(parent, { where }, { prisma }) {
        return prisma.salesOrderItem(where);
    },
    salesOrderItems(parent, args, { prisma }) {
        return prisma.salesOrderItems(args);
    },
    async salesOrderItemsConnection(parent, args, { prisma }) {
        const results = await prisma.salesOrderItemsConnection(args);
    results.aggregate = await prisma.salesOrderItemsConnection(args).aggregate();
    return results;
    },
};

module.exports = { salesOrderItem };
