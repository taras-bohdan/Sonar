import Router from 'koa-router';
import { userRouter } from './user.router';

const router = new Router({
  prefix: '/api/v1',
});

router.use(...userRouter);

export const v1 = [router.routes(), router.allowedMethods()];
