const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');

const query = `
query($where: DeliveryNoteWhereUniqueInput!) {
  deliveryNote(where: $where){
    id
    salesOrderId
    invoiceId
    userId
    customerId
    deliveryDate
    createdAt
    updatedAt
    items {
      id
      productId
      itemId
      boxNum
      createdAt
      updatedAt
    }
  }
}
`;

const deliveryNote = {
  async createDeliveryNote(parent, { data }) {
    const results = await prisma.createDeliveryNote(data);
    const createdData = await prisma.$graphql(query, { where: { id: results.id } });

    producer(
      {
        topic: 'DeliveryNoteCreate',
        message: { data: { ...createdData.deliveryNote } },
      },
    );
    return results;
  },

  async updateDeliveryNote(parent, args) {
    const prevData = await prisma.$graphql(query, { where: args.where });
    const results = await prisma.updateDeliveryNote(args);
    const updatedData = await prisma.$graphql(query, { where: args.where });
    producer(
      {
        topic: 'DeliveryNoteUpdate',
        message: { prevData: prevData.deliveryNote, data: updatedData.deliveryNote },
      },
    );
    return results;
  },

  async deleteDeliveryNote(parent, { where }) {
    console.log('where', where);
    const results = await prisma.updateDeliveryNote({
      where,
      data: {
        state: 'DELETED',
      },
    });
    console.log('results', results);
    const data = await prisma.$graphql(query, { where });
    producer(
      {
        topic: 'DeliveryNoteDelete',
        message: { data: data.deliveryNote },
      })
    return results;
  },
};

module.exports = { deliveryNote };
