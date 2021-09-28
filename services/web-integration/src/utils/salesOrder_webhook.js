const axios = require('axios');

const host = 'https://petgo.hk/admin_shop/api/salesOrder';
// const host = 'https://webhook.site/f31d5685-bc05-4000-90f5-133673f9b9ec';

function salesOrderHook({ method, type, data }) {
  console.log('axios' + type);
  console.log('sales order: ', data);
  return axios({
    method,
    url: host,
    data: {
      type,
      data,
    },
  }).then(
    response => {
      console.log(response.config);
    },
    error => {
      console.log(error);
    }
  );
}

module.exports = {
  salesOrderHook,
};
