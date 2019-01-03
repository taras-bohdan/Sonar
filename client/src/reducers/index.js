import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { app } from './app.reducer';

const rootReducer = combineReducers({
  app,
  authentication,
  users,
  alert
});

export default rootReducer;
