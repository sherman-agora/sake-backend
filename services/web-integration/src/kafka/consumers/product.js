import gql from 'graphql-tag';
const { productHook } = require('../../utils/product_webhook');
const { client } = require('../../client');

const PRODUCT = gql`
  query Product($where: ProductWhereInput!) {
    products(where: $where) {
      id
      code
      brandEn
      brandChi
      nameEn
      nameChi
      package
      discount
      weight
      shortDescription
      longDescription
      images {
        src
      }
      sku
      upc
      cost
      wholeSalePrice1
      wholeSalePrice2
      wholeSalePrice3
      wholeSalePrice4
      wholeSalePrice5
      retailPrice1
      retailPrice2
      retailPrice3
      retailPrice4
      retailPrice5
      minOrderQuantity
      minStockLevel
      onlineDate
      offlineDate
      quantity
      categories {
        id
        nameEn
        nameChi
      }
      expiryDateSummaries {
        expiryDate
      }
    }
  }
`;

const formatedProduct = ids => {
  return client
    .query({
      query: PRODUCT,
      variables: {
        where: {
          id_in: ids,
        },
      },
    })
    .then(value => {
      client.resetStore();
      const queryProducts = value.data.products;
      const formated = queryProducts.map(product => {
        const temp =
          product.expiryDateSummaries && product.expiryDateSummaries[0] && product.expiryDateSummaries[0].expiryDate;
        if (temp) {
          return { ...product, expiryDate: temp, expiryDateSummaries: '' };
        } else {
          return {
            ...product,
            expiryDate: '',
          };
        }
      });
      return formated;
    })
    .catch(e => {
      console.log(JSON.stringify(e));
    });
};

const createProduct = (data, type) => {
  return formatedProduct([data.results.id]).then(value => {
    productHook({ method: 'post', type: type, data: value });
  });
};

const updateProduct = (args, type) => {
  console.log('update product ids: ', args.where.id);
  return formatedProduct(Array.isArray(args.where.id) ? args.where.id : [args.where.id]).then(value => {
    productHook({
      method: 'put',
      type: type,
      data: value,
    });
  });
};

const deleteProduct = (where, type) => {
  return productHook({
    method: 'delete',
    type: type,
    data: where,
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
