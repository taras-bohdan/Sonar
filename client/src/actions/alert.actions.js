import { alertConstants } from '../constants';

export const alertActions = {
  success,
  error,
  clear,
};

/**
 * Create success alert action
 * @param {string} message - alert message
 * @returns {{type: string, message: *}} - success alert action with specified message
 */
function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

/**
 * Create error alert action
 * @param {string} message - alert message
 * @returns {{type: string, message: *}} - error alert action with specified message
 */
function error(message) {
  return { type: alertConstants.ERROR, message };
}

/**
 * Create clear alert action
 * @returns {{type: string}} - clear alert action
 */
function clear() {
  return { type: alertConstants.CLEAR };
}
