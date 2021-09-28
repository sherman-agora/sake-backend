const receivePayment = {
    receivePayment(parent, { where }, { prisma }) {
        return prisma.receivePayment(where);
    },
    receivePayments(parent, args, {prisma}) {
        return prisma.receivePayments(args);
    },
    async receivePaymentsConnection(parent, args, {prisma}) {
        const results = await prisma.receivePaymentsConnection(args);
    results.aggregate = await prisma.receivePaymentsConnection(args).aggregate();
    return results;
    },
};

module.exports = { receivePayment };
