import Router from 'koa-router';

// import { generateData } from '../../data-mocks/data-mocks.json';
import UserLocation from '../models/user-location.model';
import { checkToken } from '../middleware/checkToken.middleware';

const router = new Router();

router.get('/userLocations', checkToken, async (ctx) => {
  try {
    ctx.body = await UserLocation.find();
  } catch (err) {
    ctx.body = err;
  }
});

export default [router.routes(), router.allowedMethods()];
