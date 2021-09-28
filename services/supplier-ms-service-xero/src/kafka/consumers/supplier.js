const { prisma } = require('../../generated/prisma-client');
const xero = require('../../xero_Client');
const { Phone, Address, Contacts, PaymentTermType, Contact } = require('xero-node');
const getXeroContactId = require('../../utils/get_contact_info');

const createSupplier = async (data, id) => {
  const tenantsId = await xero.tenants[0].tenantId;
  const addresses = [
    {
      addressType: Address.AddressTypeEnum.POBOX,
      addressLine1: data.address,
      country: data.country,
    },
  ];
  const contactObject = {
    accountNumber: id,
    name: data.name,
    emailAddress: data.email,
    phones: [
      { phoneType: Phone.PhoneTypeEnum.MOBILE, phoneNumber: data.phone },
      { phoneType: Phone.PhoneTypeEnum.FAX, phoneNumber: data.fax },
    ],
    isCustomer: false,
    isSupplier: true,
    addresses,
  };

  const contacts = new Contacts();
  contacts.contacts = [contactObject];
  try {
    console.log('try create supplier');
    const contact = await xero.accountingApi.createContacts(tenantsId, contacts, true);
    console.log('Xero: Create Supplier Success!');
    return contact;
  } catch (error) {
    console.log('Xero: Create Error' + JSON.stringify(error));
  }
};

const updateSupplier = async args => {
  const tenantsId = await xero.tenants[0].tenantId;
  const contactId = await getXeroContactId(args.where.id);

  //update data
  const addresses = [
    {
      addressType: Address.AddressTypeEnum.POBOX,
      addressLine1: args.data.address,
      country: args.data.country,
    },
  ];
  const contactObject = {
    contactNumber: args.data.id,
    name: args.data.name,
    emailAddress: args.data.email,
    phones: [
      { phoneType: Phone.PhoneTypeEnum.MOBILE, phoneNumber: args.data.phone },
      { phoneType: Phone.PhoneTypeEnum.FAX, phoneNumber: args.data.fax },
    ],
    isCustomer: false,
    isSupplier: true,
    addresses: addresses,
  };

  const contacts = new Contacts();
  contacts.contacts = [contactObject];
  try {
    const contact = await xero.accountingApi.updateContact(tenantsId, contactId, contacts);
    console.log('Xero: Update Customer Success');
    return contact;
  } catch (error) {
    console.log('Xero: Update Customer Error' + JSON.stringify(error));
  }
};

const deleteSupplier = async where => {
  const tenantsId = await xero.tenants[0].tenantId;
  const contactId = await getXeroContactId(where.id);

  const contacts = {
    contacts: [
      {
        contactStatus: Contact.ContactStatusEnum.ARCHIVED,
      },
    ],
  };
  try {
    console.log('start delete id: ' + contactId);
    await xero.accountingApi.updateContact(tenantsId, contactId, contacts);
    console.log('Delete Supplier Success ');
  } catch (error) {
    console.log('Delete Supplier error!' + JSON.stringify(error));
  }
};

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
