import Router from 'koa-router';
import { getAllUsers, saveUser } from '../controllers/user.controller';
import passport from 'koa-passport';

const router = new Router();

/**
 * test: curl -d '{"email": "xdr-xdr@gmail.com", "username": "xdr", "firstName": "Taras", "lastName": "Bohdan",
 * "password": "123qweasd"}' --http2 --insecure https://localhost:5500/createUser -H "Content-Type: application/json"
 */
router.post('/user/signUp', async (ctx) => {
  ctx.body = await saveUser(ctx.request.body);
});

/**
 * Get all users
 */
router.get('/user/getAll', passport.authenticate('local'), async ctx => {
  ctx.body = await getAllUsers();
});

export default [router.routes(), router.allowedMethods()];
