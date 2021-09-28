const warehouse = {
  async createWarehouse(parent, { data }, { prisma, producer }) {
    const result = await prisma.createWarehouse(data);
    producer({
      topic: 'CREATE_WAREHOUSE',
      message: data,
    });
    return result;
  },
  updateWarehouse(parent, args, { prisma }) {
    return prisma.updateWarehouse(args);
  },
  deleteWarehouse(parent, { where }, { prisma }) {
    return prisma.deleteWarehouse(where);
  },
};

module.exports = { warehouse };
