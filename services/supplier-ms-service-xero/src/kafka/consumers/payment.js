const xero = require('../../xero_Client');
const { Contacts, PaymentTermType, Contact, Invoice } = require('xero-node');
const getXeroContactId = require('../../utils/get_contact_info');
const { refreshToken } = require('../../utils/refreshToken');
const gql = require('graphql-tag');
const client = require('../../utils/apolloClient');

const query = gql`
  query salesOrders($id: ID!) {
    salesOrder(where: { id: $id }) {
      code
      subtotal
      grandTotal
      invoice {
        id
        code
      }
      shop {
        customer {
          id
          code
        }
      }
    }
  }
`;

const createPayment = async data => {
  const variables = { id: data.data.salesOrderId };

  const result = await client.query({
    query,
    variables,
  });

  await refreshToken();
  const tenantsId = await xero.tenants[0].tenantId;
  // Get invoice info
  const invoiceNumber = [result.data.salesOrder.invoice.code];
  const whereInvoice = 'InvoiceNumber=="' + invoiceNumber + '"';
  const xeroInvoiceData = await xero.accountingApi.getInvoices(tenantsId, null, whereInvoice);
  const xeroInvoices = xeroInvoiceData.response.body.Invoices[0];
  console.log(xeroInvoices);

  //Get Contacts info
  const contactID = await getXeroContactId(result.data.salesOrder.shop.customer.code);

  // const whereAccount = 'Name=="Petgo Trading Limited"';
  // const account = await xero.accountingApi.getAccounts(tenantsId, null, whereAccount);

  // const accountID = account.response.body.Accounts[0];
  const accountID = process.env.ACCOUNT_ID;
  console.log('accountID', accountID);

  const payment = {
    invoice: { invoiceID: xeroInvoices.InvoiceID },
    account: {
      accountID: accountID.AccountID,
    },
    amount: result.data.salesOrder.grandTotal,
  };
  try {
    console.log('create payment...');
    await xero.accountingApi.createPayment(tenantsId, payment);
    console.log('create payment success!!');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
  xero.refreshTokenUsingTokenSet;
};

module.exports = {
  createPayment,
};
