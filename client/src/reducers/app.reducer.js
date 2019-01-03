import { appConstants } from '../constants';

const defaultState = {
  showDrawer: false,
};

/**
 * App reducer used to keep shared app state
 * @param {Object} state - app state
 * @param {{type: string, action: Object}} action - action to perform
 * @return {{showDrawer: boolean}} - new state
 */
export function app(state = defaultState, action) {
  switch (action.type) {
    case appConstants.TOGGLE_DRAWER: {
      return {
        showDrawer: !state.showDrawer,
      };
    }
    default:
      return state;
  }
}
