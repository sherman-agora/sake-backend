import { Router } from 'express';
import customer from './customer';

export default ({ config, client }) => {
  const customerRoute = Router();

  // mount the facets resource
  customerRoute.use('/customerCoupon', customer({ config, client, customerRoute }));

  // perhaps expose some API metadata at the root
  customerRoute.get('/', (req, res) => {
    res.json({});
  });

  return customerRoute;
};
