import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { join } from 'path';
import https from 'https';
import fs from 'fs';
import cors from '@koa/cors';
import session from 'koa-session';
import RedisStore from 'koa-redis';

import { config } from './config/default';
import routers from './routers';
import { logger } from './services/logger.service';
import { logRequestInfo } from './middleware/log-request.middleware';
import { PassportService } from './services/passport.service';
import { authRouter } from './routers/auth';


/**
 *
 * @type {module.Application|*|Application}
 */
const app = new Koa();

// session
app.keys = config.appKeys;
const CONFIG = {
  /* use redis store */
  store: new RedisStore(),
  key: config.cookie.key,
  maxAge: config.cookie.maxAge,
  autoCommit: config.cookie.autoCommit,
  overwrite: config.cookie.overwrite,
  httpOnly: config.cookie.httpOnly,
  signed: config.cookie.signed,
  rolling: config.cookie.rolling,
  renew: config.cookie.renew,
};
app.use(session(CONFIG, app));

// authentication
PassportService.initPassport(app);

// apollo middleware
// apollo.applyMiddleware({ app });

app
  .use(logRequestInfo)
  .use(cors())
  .use(bodyParser())
  .use(authRouter)
  .use(routers);


mongoose.connect(`${config.db.url}/${config.db.name}`, { useNewUrlParser: true }).then(() => {
  logger.info('Connected to mongo db successfully');
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
logger.info(`Listening on port: ${config.port}`);
