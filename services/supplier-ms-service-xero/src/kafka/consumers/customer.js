const { prisma } = require('../../generated/prisma-client');
const xero = require('../../xero_Client');
const { Phone, Address, Contacts, PaymentTermType, Contact } = require('xero-node');
const getXeroContactId = require('../../utils/get_contact_info');

const createCustomer = async data => {
  const tenantsId = await xero.tenants[0].tenantId;
  const addresses = [
    {
      addressType: Address.AddressTypeEnum.POBOX,
      addressLine1: data.billingAddress,
    },
    {
      addressType: Address.AddressTypeEnum.DELIVERY,
      addressLine1: data.deliverAddress,
    },
  ];
  const contactObject = {
    accountNumber: data.code,
    name: data.nameEn,
    emailAddress: data.email,
    phones: [{ phoneType: Phone.PhoneTypeEnum.MOBILE, phoneNumber: data.phone }],
    isCustomer: true,
    isSupplier: false,
    addresses,
  };

  const contacts = new Contacts();
  contacts.contacts = [contactObject];

  try {
    console.log('create customer...');
    const contact = await xero.accountingApi.createContacts(tenantsId, contacts, true);
    // create prisma data
    console.log('Xero: Create Success');
    return contact;
  } catch (error) {
    console.log('Xero: Create Error' + JSON.stringify(error));
  }
};

//Where customer code is require
const updateCustomer = async args => {
  const tenantsId = await xero.tenants[0].tenantId;
  const contactId = await getXeroContactId(args.where.code);

  // update data
  const addresses = [
    {
      addressType: Address.AddressTypeEnum.POBOX,
      addressLine1: args.data.billingAddress,
    },
    {
      addressType: Address.AddressTypeEnum.DELIVERY,
      addressLine1: args.data.deliverAddress,
    },
  ];
  const contactObject = {
    name: args.data.nameEn,
    emailAddress: args.data.email,
    phones: [{ phoneType: Phone.PhoneTypeEnum.MOBILE, phoneNumber: args.data.phone }],
    addresses,
  };

  const contacts = new Contacts();
  contacts.contacts = [contactObject];
  try {
    console.log('update customer...');
    const contact = await xero.accountingApi.updateContact(tenantsId, contactId, contacts);
    console.log('Xero: Update Customer Success');
    return contact;
  } catch (error) {
    console.log('Xero: Update Customer Error' + JSON.stringify(error));
  }
};

const deleteCustomer = async where => {
  const tenantsId = await xero.tenants[0].tenantId;
  const contactId = await getXeroContactId(where.code);

  const contacts = {
    contacts: [
      {
        contactStatus: Contact.ContactStatusEnum.ARCHIVED,
      },
    ],
  };
  try {
    console.log('start delete id...' + contactId);
    await xero.accountingApi.updateContact(tenantsId, contactId, contacts);
    console.log('Delete Customer Success ');
  } catch (error) {
    console.log('Delete Customer error!' + JSON.stringify(error));
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
