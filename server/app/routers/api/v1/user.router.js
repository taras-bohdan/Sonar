import Router from 'koa-router';
import { getAllUsers } from '../../../controllers/user.controller';

const router = new Router();

/**
 * Get all users
 */
router.get('/user/getAll', async ctx => {
  ctx.body = await getAllUsers();
});

export const userRouter = [router.routes(), router.allowedMethods()];
