import compose from 'koa-compose';
import Router from 'koa-router';
import basicRouter from './basic.router';
import googleRouter from './google.router';

const router = new Router();

/**
 * Log out
 */
router.post('/user/logout', async ctx => {
  ctx.logout();
  ctx.redirect('/login');
});


export const authRouter = compose([router.routes(), router.allowedMethods(), ...basicRouter, ...googleRouter]);
