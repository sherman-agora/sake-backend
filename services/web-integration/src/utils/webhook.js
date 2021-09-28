const axios = require('axios');

const host = 'https://petgo.hk/admin_shop/api/customer';
// const host = 'https://webhook.site/0f1dd3ce-ab6f-4261-9f42-3ee161ab18d6';

function customerHook({ method, type, data }) {
  console.log('axios' + type);
  return axios({
    method,
    url: host,
    data: {
      type,
      data,
    },
  }).then(
    response => {
      console.log(response);
    },
    error => {
      console.log(error);
    }
  );
}

module.exports = {
  customerHook,
};
