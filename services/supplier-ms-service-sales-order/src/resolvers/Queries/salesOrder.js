const salesOrder = {
    salesOrder(parent, { where }, { prisma }) {
        return prisma.salesOrder(where);
    },
    salesOrders(parent, args, { prisma }) {
        return prisma.salesOrders(args);
    },
    async salesOrdersConnection(parent, args, { prisma }) {
        const results = await prisma.salesOrdersConnection(args);
    results.aggregate = await prisma.salesOrdersConnection(args).aggregate();
    return results;
    },
};

module.exports = { salesOrder };
