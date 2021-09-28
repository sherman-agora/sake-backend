import { Router } from 'express';
import products from './products';

export default ({ config, client }) => {
  const productRoute = Router();

  // mount the facets resource
  productRoute.use('/products', products({ config, client, productRoute }));

  // perhaps expose some API metadata at the root
  productRoute.get('/', (req, res) => {
    res.json({});
  });

  return productRoute;
};
