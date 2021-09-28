const supplier = {
  async createSupplier(parent, { data }, { prisma, producer }) {
    const results = await prisma.createSupplier(data);
    producer(
      {
        topic: 'SupplierCreate',
        message: { data, id: results.id },
      },
    );
    const { nameChi, phone, email, id } = results;
    try {
      const contact = {
        contactID: id,
        name: nameChi,
        phone: [phone],
        isSupplier: true,
        email,
      };
      const response = await xero.accountingApi.updateContact(contact);
    } catch (error) {
      console.log(`error in createSupplier ${error}`);
    }
    return results;
  },
  async updateSupplier(parent, args, { prisma, producer }) {
    const results = await prisma.updateSupplier(args);
    producer(
      {
        topic: 'SupplierUpdate',
        message: { args },
      },
    );
    const { nameChi, phone, email, id } = results;
    try {
      const contact = {
        contactID: id,
        name: nameChi,
        phone: [phone],
        isSupplier: true,
        email: email,
        contactID: id,
      };
      const response = await xero.accountingApi.updateContact(contact);
    } catch (error) { }
    return results;
  },
  async deleteSupplier(parent, { where }, { prisma, producer }) {
    const results = await prisma.deleteSupplier(where);
    producer(
      {
        topic: 'SupplierDelete',
        message: { where },
      },
    );
    return results;
  },
};

module.exports = { supplier };
