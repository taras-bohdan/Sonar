import Router from 'koa-router';

import { DbConnector } from '../controllers/dbConnector';
import { generateData } from '../../data-mocks/data-mocks.json';

const router = new Router();

router.get('/users', async (ctx) => {
  const db = new DbConnector();
  await db.connect();
  try {
    ctx.body = await db.getCollectionByName('users').find({}).toArray();
  } catch (err) {
    ctx.body = err;
  } finally {
    db.closeConnection();
  }
});

/*router.get('/generateData', async (ctx) => {
  const db = new DbConnector();
  await db.connect();
  try {
    const data = generateData(20);
    await db.getCollectionByName('users').insertMany(data);
  } catch (err) {
    ctx.body = err;
  } finally {
    db.closeConnection();
  }
});*/

export default [router.routes(), router.allowedMethods()];
