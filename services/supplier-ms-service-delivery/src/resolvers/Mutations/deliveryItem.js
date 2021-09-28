const producer = require('../../kafka/producer');

const deliveryItem = {
  createDeliveryItem(parent, { data }, { prisma }) {
    return prisma.createDeliveryItem(data);
  },
  updateDeliveryItem(parent, args, { prisma }) {
    return prisma.updateDeliveryItem(args);
  },
  async deleteDeliveryItem(parent, { where }, { prisma }) {
    const deliveryItem = await prisma.deliveryItem({ id: where.id });
    console.log('deliveryItem', deliveryItem);
    producer(
      {
        topic: 'DeliveryItemDelete',
        message: { ...deliveryItem },
      },
    );

    return prisma.deleteDeliveryItem(where);
  },
};

module.exports = { deliveryItem };
