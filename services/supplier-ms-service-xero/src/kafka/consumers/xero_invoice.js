const xero = require('../../xero_Client');
const gql = require('graphql-tag');
const client = require('../../utils/apolloClient');

const UPDATE_INVOICE = gql`
  mutation updateInvoice($data: InvoiceUpdateInput!, $where: InvoiceWhereUniqueInput!) {
    updateInvoiceByXero(data: $data, where: $where) {
      id
      code
      salesOrder {
        id
      }
    }
  }
`;

const UPDATE_SALES_ORDER = gql`
  mutation updateSalesOrder($data: SalesOrderUpdateInput!, $where: SalesOrderWhereUniqueInput!) {
    updateSalesOrderByXero(data: $data, where: $where) {
      id
      code
    }
  }
`;
const updateInvoiceFromXero = async args => {
  const tenantsId = await xero.tenants[0].tenantId;
  const xeroContactsData = await xero.accountingApi.getInvoice(tenantsId, args.id, 4);
  console.log('xeroContactsData', xeroContactsData);
  const xeroInvoice = xeroContactsData.body.invoices[0];

  console.log('xeroInvoice', xeroInvoice);

  if (xeroInvoice.status === 'PAID') {
    return await client
      .mutate({
        mutation: UPDATE_INVOICE,
        variables: {
          where: {
            code: xeroInvoice.invoiceNumber,
          },
          data: {
            state: 'PAID',
            paymentStatus: 'PAID',
            paidAt: new Date(),
          },
        },
      })
      .then(value => {
        console.log('value', value);
        const salesOrderId = value.data.updateInvoiceByXero.salesOrder.id;
        client.mutate({
          mutation: UPDATE_SALES_ORDER,
          variables: {
            where: { id: salesOrderId },
            data: { state: 'PAID' },
          },
        });
      })
      .catch(e => console.log('e', JSON.stringify(e)));
  } else {
  }
};

module.exports = {
  updateInvoiceFromXero,
};
