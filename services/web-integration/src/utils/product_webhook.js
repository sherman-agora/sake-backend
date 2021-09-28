const axios = require('axios');

const host = 'https://petgo.hk/admin_shop/api/product';
// // const host = 'https://webhook.site/3938ccd4-388a-419b-9334-e59c0df050d5';

function productHook({ method, type, data }) {
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
      console.log(response.config);
    },
    error => {
      console.log(error);
    }
  );
}

module.exports = {
  productHook,
};
