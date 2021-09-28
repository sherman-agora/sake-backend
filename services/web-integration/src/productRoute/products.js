import gql from 'graphql-tag';

const PRODUCTS = gql`
  query Products {
    products {
      id
      code
      brandEn
      brandChi
      nameEn
      nameChi
      package
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

export default ({ config, client, productRoute }) =>
  productRoute.get('/', (req, res) => {
    client
      .query({
        query: PRODUCTS,
      })
      .then(value => {
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
        res.json(formated);
      });
  });
