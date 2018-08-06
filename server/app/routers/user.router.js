import Router from 'koa-router';
import { getAllUsers, saveUser, verifyUser } from '../controllers/user.controller';
import { verifyUserToken } from '../utils/jwt';
import { checkToken } from '../middleware/checkToken.middleware';


const router = new Router();

/**
 * test: curl -d '{"email": "xdr-xdr@gmail.com", "username": "xdr", "firstName": "Taras", "lastName": "Bohdan",
 * "password": "123qweasd"}' --http2 --insecure https://localhost:5500/createUser -H "Content-Type: application/json"
 */
router.post('/user/signUp', async (ctx) => {
  ctx.body = await saveUser(ctx.request.body);
});

router.post('/user/signIn', async (ctx) => {
  ctx.body = await verifyUser(ctx);
});

router.get('/user/getAll', checkToken, async ctx => {
  ctx.body = await getAllUsers();
});

//get current user from token
router.get('/user/token', (ctx) => {
  // check header or url parameters or post parameters for token
  const token = ctx.request.body.token || ctx.query.token;
  if (!token) {
    return ctx.throw(401, 'Must pass token');
  }


  ctx.body = verifyUserToken(token);
});

export default [router.routes(), router.allowedMethods()];
