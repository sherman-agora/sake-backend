const xero = require('../xero_Client');

const contact = async code => {
  console.log('supplier: ', code);
  const tenantsId = await xero.tenants[0].tenantId;
  const where = 'AccountNumber=="' + code + '"';
  const xeroContactsData = await xero.accountingApi.getContacts(tenantsId, null, where);

  const xeroContact = xeroContactsData.response.body.Contacts[0];
  console.log('xeroContact: ', xeroContact);
  const contactID = xeroContact.ContactID;
  return contactID;
};
module.exports = contact;
