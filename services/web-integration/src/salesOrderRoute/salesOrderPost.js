import gql from 'graphql-tag';

const ADD_SALES_ORDER = gql`
  mutation CreateSalesOrder($data: SalesOrderCreateInput!) {
    createSalesOrder(data: $data) {
      id
    }
  }
`;
const GET_CUSTOMER_SHOP = gql`
  query shop($where: CustomerShopWhereUniqueInput!) {
    customerShop(where: $where) {
      customer {
        wholesalePlan
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query products($where: ProductWhereInput!) {
    products(where: $where) {
      id
      wholeSalePrice1
      wholeSalePrice2
      wholeSalePrice3
      wholeSalePrice4
      wholeSalePrice5
    }
  }
`;

export default ({ config, client, salesOrderRoute }) =>
  salesOrderRoute.post('/', (req, res) => {
    console.log('Get Data From Petgo: ', req.body);
    const getCustomerPlan = new Promise((resolve, reject) => {
      console.log('query customer plan ');
      return client
        .query({
          query: GET_CUSTOMER_SHOP,
          variables: { where: { id: req.body.shopId } },
        })
        .then(value => resolve(value));
    });
    const getProductPrice = new Promise((resolve, reject) => {
      console.log('body: ', req.body);
      return client
        .query({
          query: GET_PRODUCT,
          variables: { where: { id_in: req.body.products.map(product => product.productId) } },
        })
        .then(value => resolve(value))
        .catch(e => console.log(JSON.stringify(e)));
    });
    const createSO = productPrices => {
      console.log('productPrices: ', productPrices);
      const products = req.body.products.map((product, index) => {
        const { wholeSalePrice } = productPrices.find(p => p.id === product.productId);
        const discount = `${((product.price - wholeSalePrice) / wholeSalePrice) * -100}%`;
        const discountAmount = (wholeSalePrice - product.price) * product.quantity;
        return { ...product, discount, discountAmount, wholeSalePrice };
      });

      console.log('formated products: ', products);

      return client
        .mutate({
          mutation: ADD_SALES_ORDER,
          variables: {
            data: {
              code: req.body.code.split('PO').join('SC'),
              title: req.body.title,
              remark: req.body.remark,
              discountAmount: req.body.subtotal - req.body.grandTotal,
              subtotal: req.body.subtotal,
              grandTotal: req.body.grandTotal,
              state: 'RECEIVED',
              shopId: req.body.shopId,
              couponDiscount: req.body.couponDiscount,
              shippingDate: req.body.shippingDate,
              products: {
                create: products,
              },
            },
          },
        })
        .then(value => {
          console.log(value);
          res.json({
            status: 'SUCCESS',
            id: value.data.createSalesOrder.id,
          });
        })
        .catch(error => {
          console.log(error);
          res.json({
            error,
          });
        });
    };

    return Promise.all([getCustomerPlan, getProductPrice])
      .then(value => {
        const customerPlan = value[0].data.customerShop.customer.wholesalePlan;
        const products = value[1].data.products;

        const wholeSalesPrices = products.map(product => ({
          id: product.id,
          wholeSalePrice: product[`wholeSalePrice${customerPlan}`],
        }));

        return createSO(wholeSalesPrices);
      })
      .catch(e => console.log(e));
  });
