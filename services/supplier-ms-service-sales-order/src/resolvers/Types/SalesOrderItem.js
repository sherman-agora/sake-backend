const { prisma } = require('../../generated/prisma-client');

const SalesOrderItem = {
    async salesOrder({ id }) {
        return prisma.salesOrderItem({ id }).salesOrder();
    },

    async product({ id }) {
        const data = await prisma.salesOrderItem({ id });
        return { __typename: 'Product', id: data.productId };
    },

    __resolveReference({ id }) {
        return prisma.salesOrderItem({ id });
    }
}

module.exports = {
    SalesOrderItem,
}
