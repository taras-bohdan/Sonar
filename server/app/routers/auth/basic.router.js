import Router from 'koa-router';
import { LocalAuthService } from '../../services/auth/local-auth.service';

const localAuthService = new LocalAuthService();

const router = new Router({
  prefix: '/auth/basic',
});

/**
 * Log in
 */
router.post('/login', localAuthService.authenticate(), ctx => {
  ctx.body = 'success';
});

export default [router.routes(), router.allowedMethods()];
