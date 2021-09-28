const { Contacts, PaymentTermType, Contact, Invoice, TaxType } = require('xero-node');
const xero = require('../../xero_Client');
const getXeroContactId = require('../../utils/get_contact_info');
const gql = require('graphql-tag');
const client = require('../../utils/apolloClient');

const query = gql`
  query salesOrders($id: ID!) {
    salesOrder(where: { id: $id }) {
      code
      subtotal
      state
      grandTotal
      discount
      couponDiscount
      invoice {
        id
        code
      }
      products {
        remarks
        quantity
        salesPlan
        price
        totalPrice
        product {
          code
          nameEn
          nameChi
        }
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

async function salesOrderQuery(salesOrderId) {
  const variables = { id: salesOrderId };

  const result = await client.query({
    query,
    variables,
  });

  console.log('salesOrder', result.data.salesOrder);
  return result.data.salesOrder;
}

function encodeXeroState(data) {
  switch (data.state || data.paymentStatus) {
    case 'DRAFT':
      return Invoice.StatusEnum.DRAFT;
    case 'APPROVED':
      return Invoice.StatusEnum.SUBMITTED;
    case 'CONFIRMED':
      return Invoice.StatusEnum.AUTHORISED;
    case 'INVOICED':
      return Invoice.StatusEnum.AUTHORISED;
    case 'DELIVERED':
      return Invoice.StatusEnum.AUTHORISED;
    case 'DELETED':
      return Invoice.StatusEnum.DELETED;
    case 'OVERDUE':
      return Invoice.StatusEnum.VOIDED;
    case 'PAID':
      return Invoice.StatusEnum.PAID;
    default:
      return Invoice.StatusEnum.DRAFT;
  }
}

// Create Invoice
const createInvoice = async data => {
  const salesOrderData = await salesOrderQuery(data.salesOrderId);

  const tenantsId = await xero.tenants[0].tenantId;
  // Get contacts info
  const customerCode = salesOrderData.shop.customer.code;

  const contactID = await getXeroContactId(customerCode);

  const invoinceState = encodeXeroState(data);

  // const whereAccount = 'Name=="Petgo Trading Limited"';
  // const account = await xero.accountingApi.getAccounts(tenantsId, null, whereAccount);

  // const accountID = account.response.body.Accounts[0];
  // console.log('accountID', accountID);

  const accountID = process.env.ACCOUNT_ID;
  console.log('accountID', accountID);
  // petgo bank account ID

  let lineItems = salesOrderData.products.map(product => {
    const item = {
      accountCode: 200,
      itemCode: product.product.code,
      description: product.product.nameEn,
      quantity: product.quantity,
      unitAmount: product.price,
      taxType: TaxType.NONE,
    };
    return item;
  });

  lineItems.push(
    ...[
      {
        description: 'Special Offer',
        quantity: 1,
        unitAmount: -salesOrderData.discount,

        taxType: TaxType.NONE,
      },
      {
        description: 'Coupon Discount',
        quantity: 1,
        unitAmount: -salesOrderData.couponDiscount,

        taxType: TaxType.NONE,
      },
    ]
  );

  console.dir('lineItem', lineItems);

  const invoices = {
    invoices: [
      {
        invoiceNumber: data.code,
        type: Invoice.TypeEnum.ACCREC,
        contact: {
          contactID,
        },
        lineItems,
        status: invoinceState,
        subTotal: salesOrderData.subtotal,
        total: salesOrderData.grandTotal,
        dueDate: data.shipmentDate,
      },
    ],
  };

  try {
    console.log('create invoice...');
    const contact = await xero.accountingApi.createInvoices(tenantsId, invoices, true);
    console.log('Xero: Create invoice Success');
    return contact;
  } catch (error) {
    console.log(`Xero: Create Error${JSON.stringify(error)}`);
  }
};

// Update Invoice
const updateInvoice = async data => {
  console.log(data);
  const salesOrderData = await salesOrderQuery(data.id);
  const tenantsId = await xero.tenants[0].tenantId;
  // Get invoice info
  const salesOrderNumber = [salesOrderData.invoice.code];
  const where = `InvoiceNumber=="${salesOrderNumber}"`;
  const xeroInvoiceData = await xero.accountingApi.getInvoices(tenantsId, null, where);
  const xeroInvoices = xeroInvoiceData.response.body.Invoices[0];

  // Get Contacts info
  const contactID = await getXeroContactId(salesOrderData.shop.customer.code);
  console.log('contactID', JSON.stringify(contactID));

  // const invoinceState = encodeXeroState(salesOrderData);

  // const whereAccount = 'Name=="Petgo Trading Limited"';
  // const account = await xero.accountingApi.getAccounts(tenantsId, null, whereAccount);

  // const accountID = account.response.body.Accounts[0];

  const accountID = process.env.ACCOUNT_ID;
  console.log('accountID', accountID);
  // petgo bank account ID

  let lineItems = salesOrderData.products.map(product => {
    const item = {
      accountCode: 200,
      itemCode: product.product.code,
      description: product.product.nameEn,
      quantity: product.quantity,
      unitAmount: product.price,
      taxType: TaxType.NONE,
    };
    return item;
  });

  lineItems.push(
    ...[
      {
        description: 'Special Offer',
        quantity: 1,
        unitAmount: -salesOrderData.discount,

        taxType: TaxType.NONE,
      },
      {
        description: 'Coupon Discount',
        quantity: 1,
        unitAmount: -salesOrderData.couponDiscount,

        taxType: TaxType.NONE,
      },
    ]
  );

  console.log('lineItem', lineItems);

  const invoices = {
    invoices: [
      {
        invoiceNumber: salesOrderData.invoice.code,
        type: Invoice.TypeEnum.ACCREC,
        contact: {
          contactID,
        },
        lineItems,
        status: salesOrderData.state === 'DELETED' ? Invoice.StatusEnum.DELETED : null,
        subTotal: salesOrderData.subtotal,
        total: salesOrderData.grandTotal,
        dueDate: data.shipmentDate,
      },
    ],
  };
  console.log('invoice: ', invoices);
  try {
    console.log('start update...');
    await xero.accountingApi.updateInvoice(tenantsId, xeroInvoices.InvoiceID, invoices);
    console.log('update invoice success!!');
  } catch (err) {
    console.log(`update error: ${JSON.stringify(err)}`);
  }
};

module.exports = {
  createInvoice,
  updateInvoice,
};
