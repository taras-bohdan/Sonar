import '@babel/polyfill';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { join } from 'path';
import https from 'https';
import fs from 'fs';
import cors from '@koa/cors';

import config from './config/default';
import routers from './routers';
import loggerService from './services/logger.service';
import { apollo } from './controllers/user-location.controller';

require('dotenv').config();

const app = new Koa();

apollo.applyMiddleware({ app });

app
  .use(async (ctx, next) => {
    try {
      // Log the request to the console
      loggerService.info('Url:', ctx.url);
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

mongoose.connect(`${config.db.url}/${config.db.name}`, { useNewUrlParser: true }).then(() => {
  loggerService.info('Connected to mongo db successfully');
});


/*
 // TODO uncomment when apollo http2 fixed
 const options = {
 key: fs.readFileSync(join(__dirname, '../ssl/server.key')),
 cert: fs.readFileSync(join(__dirname, '../ssl/server.crt')),
 allowHTTP1: true, // TODO disable this later
 };
 const server = http2
 .createSecureServer(options, app.callback());
 server.listen(config.port);
 */

const server = https.createServer({
  key: fs.readFileSync(join(__dirname, '../ssl/server.key')),
  cert: fs.readFileSync(join(__dirname, '../ssl/server.crt')),
}, app.callback());

server.listen(config.port);
loggerService.info(`Listening on port: ${config.port}`);
