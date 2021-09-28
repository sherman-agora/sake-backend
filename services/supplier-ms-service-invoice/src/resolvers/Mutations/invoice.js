const invoice = {
  async createInvoice(parent, { data }, { prisma, producer }) {
    const results = await prisma.createInvoice(data);
    producer({
      topic: 'InvoiceCreate',
      message: data,
    });
    return results;
  },
  async updateInvoice(parent, args, { prisma, producer }) {
    const results = await prisma.updateInvoice(args);
    producer({
      topic: 'InvoiceUpdate',
      message: { results: results, updateData: args },
    });
    return results;
  },
  async deleteInvoice(parent, { where }, { prisma, producer }) {
    const results = await prisma.updateInvoice({ where, data: { state: 'DELETED' } });
    // const results = await prisma.deleteInvoice(where);
    producer({
      topic: 'InvoiceDelete',
      message: results,
    });
    return results;
  },
  async updateInvoiceByXero(parent, { where }, { prisma, producer }) {
    const results = await prisma.updateInvoice({
      where,
      data: { state: 'PAID', paymentStatus: 'PAID', paidAt: new Date() },
    });
    return results;
  },
};

module.exports = { invoice };
