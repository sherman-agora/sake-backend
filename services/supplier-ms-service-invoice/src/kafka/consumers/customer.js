const { prisma } = require('../../generated/prisma-client');

const createCustomer = async (data) => await prisma.createInvoiceUser({
    id: data.id,
    name: data.nameEn,
    code: data.code
    // nameChi: data.data.nameChi,
    // billingAddress: data.data.billingAddress,
    // deliverAddress: data.data.deliverAddress,
    // phone: data.data.phone,
    // email: data.data.email,
    // remark: data.data.remark,
});

const updateCustomer = async ({ args }) => prisma.updateInvoiceCustomer(args);

const deleteCustomer = async (where) => prisma.deleteInvoiceCustomer(where);

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
