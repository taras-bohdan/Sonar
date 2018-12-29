import React, { Component } from 'react';
import queryString from 'query-string';
import connect from 'react-redux/es/connect/connect';

import { func, object } from 'prop-types';
import { loginSuccess } from '../actions/auth.actions';

/**
 * Callback component
 * Used to set refresh token on auth callback
 */
class CallbackComponent extends Component {
  /**
   * Redirect function
   * @param {string} url - url to redirect to
   * @return {void}
   */
  redirectTo = (url) => {
    this.props.history.push(url);
  };

  /**
   * Set refresh token on component mount
   * @return {void}
   */
  componentDidMount() {
    const { refreshToken } = queryString.parse(this.props.location.search);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
      this.redirectTo('/');
      this.props.onLogin();
    } else {
      this.redirectTo('/login');
    }
  }

  /**
   * Render component body
   * @return {*} - component html
   */
  render() {
    return (<div>success</div>);
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  /**
   * Dispatch login action
   * @returns {void}
   */
  onLogin: () => {
    dispatch(loginSuccess());
  },
});

export const Callback = connect(mapStateToProps, mapDispatchToProps)(CallbackComponent);

CallbackComponent.propTypes = {
  onLogin: func,
  history: object,
  location: object,
};
