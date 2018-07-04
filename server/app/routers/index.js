import compose from 'koa-compose';
import coreRouter from './core.router';
import userRouter from './user.router';
import graphQlRouter from './graphql.router';

export default compose([graphQlRouter, ...coreRouter, ...userRouter]);
