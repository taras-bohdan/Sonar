import Router from 'koa-router';

import UserLocation from '../models/user-location.model';

const router = new Router();

router.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
  }
});

router.get('/userLocations', async (ctx) => {
  try {
    ctx.body = await UserLocation.find();
  } catch (err) {
    ctx.body = err;
  }
});

export default [router.routes(), router.allowedMethods()];
