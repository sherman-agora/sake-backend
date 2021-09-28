const deliveryNote = {
    deliveryNote(parent, { where }, { prisma }) {
        return prisma.deliveryNote(where);
    },
    deliveryNotes(parent, args, {prisma}) {
        return prisma.deliveryNotes(args);
    },
    async deliveryNotesConnection(parent, args, {prisma}) {
        const results = await prisma.deliveryNotesConnection(args);
    results.aggregate = await prisma.deliveryNotesConnection(args).aggregate();
    return results;
    },
};

module.exports = { deliveryNote };
