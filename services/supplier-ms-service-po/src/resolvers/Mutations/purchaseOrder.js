const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const query = `
query($where: PurchaseOrderWhereUniqueInput!) {
  purchaseOrder(where:$where){
    id
    code
    supplierId
    userId
    expectedDeliveryAt
    unfinishedTax
    totalPrice
    state
    createdAt
    updatedAt
    products {
      id
      productId
      remarks
      quantity
      price
      totalPrice 
      deliveryDate
      expiryDate
      tax
      createdAt
      updatedAt
    }
  }
}
`;

const purchaseOrder = {
  async createPurchaseOrder(parent, { data }) {
    const results = await prisma.createPurchaseOrder(data);
    const createdData = await prisma.$graphql(query, { where: { id: results.id } });

    producer(
      {
        topic: 'PurchaseOrderCreate',
        message: { data: { ...createdData.purchaseOrder } },
      },
    );
    return results;
  },

  async updatePurchaseOrder(parent, args) {
    const prevData = await prisma.$graphql(query, { where: args.where });
    const results = await prisma.updatePurchaseOrder(args);
    const updatedData = await prisma.$graphql(query, { where: args.where });
    producer(
      {
        topic: 'POUpdate',
        message: { prevData: prevData.purchaseOrder, data: updatedData.purchaseOrder },
      },
    );
    return results;
  },
  async deletePurchaseOrder(parent, { where }) {
    const results = await prisma.updatePurchaseOrder({ where, data: { state: 'DELETED' } });
    const data = await prisma.$graphql(query, { where });
    producer(
      {
        topic: 'PurchaseOrderDelete',
        message: { data: data.purchaseOrder },
      },
    );
    return results;
  },
};

module.exports = { purchaseOrder };
