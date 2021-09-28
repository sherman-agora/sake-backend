const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const query = `
query($where: ShippingWhereUniqueInput!) {
  shipping(where: $where){
    id
    code
    purchaseOrderId
    userId
    deliveryAt
    unfinishedTax
    totalPrice
    createdAt
    updatedAt
    products {
      id
      productId
      warehouseId
      expiryDate
      labelFrom
      labelTo
      expectedQuantity
      quantity
      price
      totalPrice 
      deliveryDate
      remarks
      createdAt
      updatedAt
    }
  }
}
`;

const shipping = {
  async createShipping(parent, { data }) {
    const results = await prisma.createShipping(data);
    const createdData = await prisma.$graphql(query, { where: { id: results.id } });

    producer(
      {
        topic: 'SPCreate',
        message: { data: { ...createdData.shipping } },
      },
    );
    return results;
  },

  async updateShipping(parent, args) {
    const prevData = await prisma.$graphql(query, { where: args.where });
    const results = await prisma.updateShipping(args);
    const updatedData = await prisma.$graphql(query, { where: args.where });
    producer(
      {
        topic: 'ShippingUpdate',
        message: { prevData: prevData.shipping, data: updatedData.shipping },
      },
    );
    return results;
  },

  async deleteShipping(parent, { where }) {
    const data = await prisma.$graphql(query, { where });
    const results = await prisma.updateShipping({
      where,
      data: { code: `${data.shipping.code}-${Math.round(Math.random() * 89999 + 10000)}`, state: 'DELETE' },
    });
    producer(
      {
        topic: 'ShippingDelete',
        message: { data: data.shipping },
      },
    );
    return results;
  },
};

module.exports = { shipping };
