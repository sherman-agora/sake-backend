const { prisma } = require('../../generated/prisma-client');
const producer = require('../../kafka/producer');
const gql = require('graphql-tag');
const client = require('../../utils/apolloClient');

const query = `
query($where: ReceivePaymentWhereUniqueInput!) {
  receivePayment(where: $where){
    id
    invoiceId
    deliveryNoteId
    userId
    createdAt
    updatedAt
  }
}
`;

const query_salesOrder = gql`
  query($where: InvoiceWhereUniqueInput!) {
    invoice(where: $where) {
      salesOrder {
        id
      }
    }
  }
`;

const receivePayment = {
  async createReceivePayment(parent, { data }) {
    const results = await prisma.createReceivePayment(data);
    const createdData = await prisma.$graphql(query, { where: { id: results.id } });

    const salesOrder = await client.query({
      query: query_salesOrder,
      variables: {
        where: {
          id: createdData.receivePayment.invoiceId,
        },
      },
    });
    const salesOrderId = salesOrder.data.invoice.salesOrder.id;

    producer(
      {
        topic: 'ReceivePaymentCreate',
        message: { data: { ...createdData.receivePayment, salesOrderId } }
      },
    );
    return results;
  },

  async updateReceivePayment(parent, args) {
    const prevData = await prisma.$graphql(query, { where: args.where });
    const results = await prisma.updateReceivePayment(args);
    const updatedData = await prisma.$graphql(query, { where: args.where });
    producer(
      {
        topic: 'UpdateReceivePayment',
        message: { prevData: prevData.receivePayment, data: updatedData.receivePayment },
      },
    );
    return results;
  },

  async deleteReceivePayment(parent, { where }) {
    const results = await prisma.updateReceivePayment({ where, data: { state: 'DELETED' } });
    const data = await prisma.$graphql(query, { where });
    producer(
      {
        topic: 'ReceivePaymentDelete',
        message: { data: data.receivePayment },
      },
    );
    return results;
  },
};

module.exports = { receivePayment };
