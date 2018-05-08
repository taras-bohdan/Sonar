import Koa from 'koa';

import config from './config/default';
import routers from './routers';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

const koa = new Koa();

koa.use(bodyParser());

koa.use(async (ctx, next) => {
  // Log the request to the console
  console.log('Url:', ctx.url);
  // Pass the request to the next middleware function
  await next();
});

koa.use(routers);
koa.listen(config.port);
console.log(`server started on port ${config.port}`);

mongoose.connect(`${config.db.url}/${config.db.name}`).then(() => {
  console.log('Connected to mongo db successfully');
});