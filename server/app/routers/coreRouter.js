import Router from 'koa-router';

import { DbConnector } from '../controllers/dbConnector';
import { generateData } from '../../data-mocks/data-mocks.json';
import User from '../models/user';
import UserLocation from '../models/userLocation';

const router = new Router();

router.get('/users', async (ctx) => {
  const db = new DbConnector();
  try {
    await db.connect();
    ctx.body = await User.find();
  } catch (err) {
    ctx.body = err;
  }
});

router.get('/userLocations', async (ctx) => {
  const db = new DbConnector();
  try {
    await db.connect();
    ctx.body = await UserLocation.find();
  } catch (err) {
    ctx.body = err;
  }
});

router.get('/generateData', async (ctx) => {
  const db = new DbConnector();
  const numberOfItems = ctx.query.items || 0;
  try {
    await db.connect();
    const data = generateData(numberOfItems);
    data.forEach(userLocation => {
      const newUserLocation = new UserLocation(userLocation);
      newUserLocation.save(err => {
        if (err) throw err;
      });
    });
  } catch (err) {
    ctx.body = err;
  }
});

export default [router.routes(), router.allowedMethods()];
