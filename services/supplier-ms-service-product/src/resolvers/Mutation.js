const { product } = require('./Mutations/product');
const { productCategory } = require('./Mutations/productCategory');

const Mutation = {
  ...product,
  ...productCategory
}

module.exports = { Mutation }
