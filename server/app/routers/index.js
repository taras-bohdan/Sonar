import compose from 'koa-compose';
import coreRouter from './coreRouter';
import graphQlRouter from './graphQl';

export default compose([graphQlRouter, ...coreRouter]);
