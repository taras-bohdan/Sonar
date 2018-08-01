import React, { Component } from 'react';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import { func, bool } from 'prop-types';

export class PrivateRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={
        props => isAuthenticated ?
          (<Component {...props} />) :
          (<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />)
      }
      />);
  }
}

PrivateRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
};
