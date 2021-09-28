import gql from 'graphql-tag';

const UPDATE_CUSTOMER_COUPON = gql`
  mutation($where: CustomerWhereUniqueInput!, $data: CustomerUpdateInput!) {
    updateCustomer(where: $where, data: $data) {
      id
      code
    }
  }
`;

export default ({ config, client, customerRoute }) =>
  customerRoute.put('/', (req, res) => {
    const code = req.body.req;
    console.log(code === undefined);
    const { id } = req.body;
    const { coupon } = req.body;
    const { discount } = coupon;

    // format the discount input
    if (discount.match(/\s/g)) {
      res.json({ message: 'Must not have blank key' });
    } else if (discount.startsWith('HKD') || discount.includes('%')) {
      client
        .mutate({
          mutation: UPDATE_CUSTOMER_COUPON,
          variables: {
            where: code === undefined ? { id } : { code },
            data: {
              coupons: {
                upsert: {
                  where: { code: coupon.code },
                  update: coupon,
                  create: coupon,
                },
              },
            },
          },
        })
        .then(value => res.json({ status: 'Success', message: req.body }))
        .catch(error => {
          console.log(error);
          res.json({
            error,
          });
        });
    } else {
      res.json({ message: 'Discount Format Error' });
    }
  });
