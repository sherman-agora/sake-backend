import { Router } from 'express';
import salesOrderPost from './salesOrderPost';
import salesOrderDelete from './salesOrderDelete';

export default ({ config, client }) => {
  let salesOrderRoute = Router();

  // mount the facets resource
  salesOrderRoute.use('/salesOrder', salesOrderPost({ config, client, salesOrderRoute }));
  salesOrderRoute.use('/salesOrder', salesOrderDelete({ config, client, salesOrderRoute }));

  // perhaps expose some API metadata at the root
  salesOrderRoute.get('/', (req, res) => {
    res.json({});
  });

  return salesOrderRoute;
};
