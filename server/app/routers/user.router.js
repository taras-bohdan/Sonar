import Router from 'koa-router';
import { getAllUsers, getUserInfo, saveUser } from '../controllers/user.controller';
import { JWTService } from '../services/jwt.service';
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
 * Log in
 */
router.post('/user/signIn', passport.authenticate('local', {
  successRedirect: '/user/status',
}));

/**
 * Log out
 */
router.post('/user/logout', async ctx => {
  ctx.logout();
  ctx.body = 'Logged out successfully';
});

/**
 * Get all users
 */
router.get('/user/getAll', passport.authenticate('local'), async ctx => {
  ctx.body = await getAllUsers();
});

/**
 * Get user login status
 */
router.get('/user/status', async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.body = await getUserInfo(ctx.state.user);
  } else {
    ctx.status = 401;
  }
});

/**
 * Verify user token
 */
router.get('/user/token', (ctx) => {
  // check header or url parameters or post parameters for token
  const token = ctx.request.body.token || ctx.query.token;
  if (!token) {
    return ctx.throw(401, 'Must pass token');
  }


  ctx.body = JWTService.verifyUserToken(token);
});

export default [router.routes(), router.allowedMethods()];
