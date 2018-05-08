import Router from 'koa-router';

import { generateData } from '../../data-mocks/data-mocks.json';
// import User from '../models/user';
import UserLocation from '../models/userLocation';

const router = new Router();


/*router.get('/users', async (ctx) => {
  try {
    ctx.body = await User.find();
  } catch (err) {
    ctx.body = err;
  }
});*/

router.get('/userLocations', async (ctx) => {
  try {
    ctx.body = await UserLocation.find();
  } catch (err) {
    ctx.body = err;
  }
});

router.get('/generateData', async (ctx) => {
  const numberOfItems = +ctx.query.items || 0;
  try {
    const data = generateData(numberOfItems);
    data.forEach(userLocation => {
      const newUserLocation = new UserLocation(userLocation);
      newUserLocation.save(err => {
        if (err) throw err;
      });
    });
    ctx.body = 'Saved generated items into DB';
  } catch (err) {
    ctx.body = `Cannot generate data ${err}`;
  }
});

export default [router.routes(), router.allowedMethods()];
