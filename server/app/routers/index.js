import compose from 'koa-compose';
import coreRouter from './core.router';
import { v1 } from './api/v1';

export default compose([...coreRouter, ...v1]);
