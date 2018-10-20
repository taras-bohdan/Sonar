import compose from 'koa-compose';
import coreRouter from './core.router';
import userRouter from './user.router';

export default compose([...coreRouter, ...userRouter]);
