import Router from 'koa-router';
import { GoogleAuthService } from '../../services/auth/google-auth.service';

const googleAuthService = new GoogleAuthService();
const router = new Router({
  prefix: '/auth/google',
});

router.get('/', googleAuthService.authenticate());

router.get('/callback', googleAuthService.callback(), ctx => {
  ctx.redirect(`/callback?refreshToken=${ctx.state.user.refreshToken}`);
});

export default [router.routes(), router.allowedMethods()];
