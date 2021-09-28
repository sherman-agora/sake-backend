import gql from 'graphql-tag';
const { salesOrderHook } = require('../../utils/salesOrder_webhook');
const { client } = require('../../client');

const GET_SALES_ORDER = gql`
  query salesOrder($where: SalesOrderWhereUniqueInput!) {
    salesOrder(where: $where) {
      code
      title
      remark
      subtotal
      grandTotal
      state
      discountAmount
      discount
      products {
        discount
        quantity
        price
        totalPrice
        product {
          code
        }
      }
    }
  }
`;

const updateSalesOrder = (args, type) => {
  console.log('HELLO ERROR: ', args);
  const salesOrderID = args.id;
  return client
    .query({
      query: GET_SALES_ORDER,
      variables: {
        where: { id: salesOrderID },
      },
    })
    .then(value => {
      const products = value.data.salesOrder.products.map(p => ({ code: p.product.code, ...p }));
      console.log('products', products);
      const code = value.data.salesOrder.code.split('SC').join('PO');
      console.log('code: ', code);
      salesOrderHook({
        method: 'put',
        type: type,
        data: { ...value.data, products, code },
      });
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = {
  updateSalesOrder,
};
