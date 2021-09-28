const { product } = require('./Queries/product');
const { productCategory } = require('./Queries/productCategory');

const Query = {
  ...product,
  ...productCategory
}

module.exports = { Query }
