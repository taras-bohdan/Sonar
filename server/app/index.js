import Koa from 'koa';

import config from './config/default';
import routers from './routers';

const koa = new Koa();

koa.use(async (ctx, next) => {
  // Log the request to the console
  console.log('Url:', ctx.url);
  // Pass the request to the next middleware function
  await next();
});


koa.use(routers);
koa.listen(config.port);
console.log(`server started on port ${config.port}`);