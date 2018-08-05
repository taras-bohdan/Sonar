import { alertConstants, alertTypes } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertTypes.SUCCESS,
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: alertTypes.ERROR,
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
