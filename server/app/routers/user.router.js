import Router from 'koa-router';
import { saveUser, verifyUser } from '../controllers/user.controller';
import { verifyUserToken } from '../utils/jwt';


const router = new Router();

/**
 * test: curl -d '{"email": "xdr-xdr@gmail.com", "username": "xdr", "firstName": "Taras", "lastName": "Bohdan", "password": "123qweasd"}' --http2 --insecure https://localhost:5500/createUser -H "Content-Type: application/json"
 */
router.post('/user/signUp', async(ctx) => {
  ctx.body = await saveUser(ctx.request.body);
});

router.post('/user/signIn', async(ctx) => {
  ctx.body = await verifyUser(ctx.request.body);
});

//get current user from token
router.get('/user/token', (ctx, next) => {
  // check header or url parameters or post parameters for token
  const token = ctx.request.body.token || ctx.query.token;
  if (!token) {
    return ctx.throw(401, 'Must pass token');
  }


  ctx.body = verifyUserToken(token);
});

export default [router.routes(), router.allowedMethods()];
