import { join } from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import http2 from 'http2';
import fs from 'fs';
import cors from '@koa/cors';

import config from './config/default';
import routers from './routers';
import logger from './utils/logger';
require('dotenv').config();

const app = new Koa();

app
  .use(async (ctx, next) => {
    try {
      // Log the request to the console
      logger.info('Url:', ctx.url);
      // Pass the request to the next middleware function
      await next();
    } catch (e) {
      ctx.status = e.statusCode || 500;
      ctx.body = e.message;
    }
  })
  .use(cors())
  .use(bodyParser())
  .use(routers);

mongoose.connect(`${config.db.url}/${config.db.name}`).then(() => {
  logger.info('Connected to mongo db successfully');
});


const options = {
  key: fs.readFileSync(join(__dirname, '../ssl/server.key')),
  cert: fs.readFileSync(join(__dirname, '../ssl/server.crt')),
  allowHTTP1: true, // TODO disable this later
};
const server = http2
  .createSecureServer(options, app.callback());
server.listen(config.port);
