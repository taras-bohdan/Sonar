import { appConstants } from '../constants';

/**
 * Togle drawer
 * @return {{type: string}} - toggle drawer action
 */
export function toggleDrawer() {
  return { type: appConstants.TOGGLE_DRAWER };
}
