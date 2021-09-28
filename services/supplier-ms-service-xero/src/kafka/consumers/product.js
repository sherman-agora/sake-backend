const xero = require('../../xero_Client');
const { PurchaseOrder, PaymentTermType, Contact } = require('xero-node');

const createProduct = async data => {
  const tenantsId = await xero.tenants[0].tenantId;

  const salesDetails = {
    accountCode: '200',
    taxType: 'NONE',
  };
  const items = {
    items: [
      {
        code: data.code,
        name: data.nameEn,
        salesDetails,
      },
    ],
  };

  try {
    console.log('create product...');
    const contact = await xero.accountingApi.createItems(tenantsId, items, true);
    console.log('Xero: Create Success');
    return contact;
  } catch (error) {
    console.log('Xero: Create Error' + JSON.stringify(error));
  }
};

const updateProduct = async data => {
  const tenantsId = await xero.tenants[0].tenantId;

  const where = 'Code=="' + data.where.code + '"';
  const xeroItems = await xero.accountingApi.getItems(tenantsId, null, where);
  const xeroItem = xeroItems.response.body.Items[0];

  const purchase = {
    taxType: 'NONE',
  };

  const items = {
    items: [
      {
        code: data.where.code,
        name: data.data.nameEn,
        // salesDetails:
      },
    ],
  };

  try {
    console.log('start update');
    const contact = await xero.accountingApi.updateItem(tenantsId, xeroItem.ItemID, items);
    console.log('Xero: Update Success');
    return contact;
  } catch (error) {
    console.log('Xero: Update Error' + JSON.stringify(error));
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
