const deliveryItem = {
    deliveryItem(parent, { where }, { prisma }) {
        return prisma.deliveryItem(where);
    },
    deliveryItems(parent, args, {prisma}) {
        return prisma.deliveryItems(args);
    },
    async deliveryItemsConnection(parent, args, {prisma}) {
        const results = await prisma.deliveryItemsConnection(args);
    results.aggregate = await prisma.deliveryItemsConnection(args).aggregate();
    return results;
    },
};

module.exports = { deliveryItem };
