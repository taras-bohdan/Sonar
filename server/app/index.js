import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { join } from 'path';
import https from 'https';
import fs from 'fs';
import cors from '@koa/cors';
import session from 'koa-session';
import RedisStore from 'koa-redis';

import config from './config/default';
import routers from './routers';
import loggerService from './services/logger.service';
import { logRequestInfo } from './middleware/log-request.middleware';
import { AuthenticationService } from './services/authentication.service';

require('dotenv').config();


/**
 *
 * @type {module.Application|*|Application}
 */
const app = new Koa();

// session
app.keys = ['some secret key'];
const CONFIG = {
  /* use redis store */
  store: new RedisStore(),
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true,
  /** (boolean) automatically commit headers (default true) */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// authentication
AuthenticationService.initPassport(app);


// apollo middleware
// apollo.applyMiddleware({ app });

app
  .use(logRequestInfo)
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
