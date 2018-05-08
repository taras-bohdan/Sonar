import Router from 'koa-router';
import { graphiqlKoa } from 'apollo-server-koa';

import graphQlExample from '../controllers/userLocation.controller';

const router = new Router();

router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql',
  }),
);

router.post('/graphql', graphQlExample);
router.get('/graphql', graphQlExample);

export default router.routes();