import { alertActions } from './alert.actions';
import { alertConstants } from '../constants';

describe('Alert actions', () => {
  test('create success alert action', () => {
    const message = 'success message';

    const action = alertActions.success(message);
    const expectedAction = {
      type: alertConstants.SUCCESS,
      message,
    };

    expect(action).toEqual(expectedAction);
  });

  test('create error alert action', () => {
    const message = 'error message';

    const action = alertActions.error(message);
    const expectedAction = {
      type: alertConstants.ERROR,
      message,
    };

    expect(action).toEqual(expectedAction);
  });

  test('create clear alert action', () => {
    const action = alertActions.clear();
    const expectedAction = {
      type: alertConstants.CLEAR,
    };

    expect(action).toEqual(expectedAction);
  });
});
