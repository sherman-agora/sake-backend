const { customerHook } = require('../../utils/webhook');

const createCustomer = (data, type) => {
  return customerHook({ method: 'post', type: type, data: data });
};

const updateCustomer = (args, type) => {
  return customerHook({
    method: 'put',
    type: type,
    data: { ...args.data, ...args.where },
  });
};

const deleteCustomer = (where, type) => {
  return customerHook({
    method: 'delete',
    type: type,
    data: where,
  });
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
