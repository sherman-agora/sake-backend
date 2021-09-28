const { prisma } = require('../../generated/prisma-client');
const xero = require('../../xero_Client');
const { objectToLowerCase } = require('../../utils/toLowerCase');
const { PurchaseOrder, PaymentTermType, Contact } = require('xero-node');
const getXeroContactId = require('../../utils/get_contact_info');
const client = require('../../utils/apolloClient');
const gql = require('graphql-tag');

const query = gql`
  query purchaseOrder($where: PurchaseOrderWhereUniqueInput!) {
    purchaseOrder(where: $where) {
      code
      products {
        id
        remarks
        quantity
        price
        totalPrice
        deliveryDate
        expiryDate
        tax
        product {
          code
          brandEn
          brandChi
          nameEn
          nameChi
        }
      }
    }
  }
`;

function encodeState(data) {
  let poState;
  switch (data) {
    case 'DRAFT':
      poState = PurchaseOrder.StatusEnum.DRAFT;
      break;
    case 'PENDING':
      poState = PurchaseOrder.StatusEnum.SUBMITTED;
      break;
    case 'CONFIRMED':
      poState = PurchaseOrder.StatusEnum.AUTHORISED;
      break;
    case 'DELETED':
      poState = PurchaseOrder.StatusEnum.DELETED;
      break;

    default:
      break;
  }
  return poState;
}

async function queryPoProducts(id) {
  const variables = { where: { id: id } };
  const data = await client.query({
    query: query,
    variables: variables,
  });
  return data.data.purchaseOrder.products;
  console.log('poProduct here: ', JSON.stringify(updatedData));
}

const createPurchaseOrder = async data => {
  const poProducts = await queryPoProducts(data.id);
  const tenantsId = await xero.tenants[0].tenantId;
  const contactID = await getXeroContactId(data.supplierId);

  const lineItems = poProducts.map(product => {
    const item = {
      itemCode: product.product.code,
      description: product.product.nameEn,
      quantity: product.quantity,
      taxAmount: product.tax,
      unitAmount: product.price,
    };
    return item;
  });
  const poState = encodeState(data.state);

  const purchaseOrders = {
    purchaseOrders: [
      {
        purchaseOrderNumber: data.code,
        contact: {
          contactID: contactID,
        },
        lineItems: lineItems,
        deliveryDate: data.expectedDeliveryAt,
        status: poState,
      },
    ],
  };
  try {
    console.log('create po...');
    const po = await xero.accountingApi.createPurchaseOrders(tenantsId, purchaseOrders, true);
    console.log('Xero: Create PO Success');
    return po;
  } catch (error) {
    console.log('Xero: Create Error' + JSON.stringify(error));
  }
};

//Where customer code is require
const updatePurchaseOrder = async args => {
  const poProducts = await queryPoProducts(args.data.id);
  const tenantsId = await xero.tenants[0].tenantId;
  const xeroPOData = await xero.accountingApi.getPurchaseOrders(tenantsId);

  const xeroPurchaseOrders = xeroPOData.response.body.PurchaseOrders;
  const xeroPurchaseOrder = await xeroPurchaseOrders.find(
    purchasOrder => purchasOrder.PurchaseOrderNumber === args.data.code
  );
  const purchaseOrderID = xeroPurchaseOrder.PurchaseOrderID;

  const poState = encodeState(args.data.state);

  // const lineItems = args.poProducts.map(product => {
  //     return {
  //         itemCode: product.product.code,
  //         description: product.product.nameEn,
  //         quantity: product.quantity,
  //         taxAmount: product.tax,
  //         unitAmount: product.price
  //     }
  // });

  console.dir('object');
  const purchaseOrders = {
    purchaseOrders: [
      {
        purchaseOrderID,
        // lineItems: lineItems,
        deliveryDate: args.data.expectedDeliveryAt,
        status: poState,
      },
    ],
  };
  try {
    console.log('update po...');
    const po = await xero.accountingApi.updateOrCreatePurchaseOrders(tenantsId, purchaseOrders, true);
    console.log('Xero: update PO Success');
    return po;
  } catch (error) {
    console.log('Xero: Create Error' + JSON.stringify(error));
  }
};

module.exports = {
  createPurchaseOrder,
  updatePurchaseOrder,
};
