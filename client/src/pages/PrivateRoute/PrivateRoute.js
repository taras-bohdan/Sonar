import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import { func, shape, bool } from 'prop-types';
import { connect } from 'react-redux';

/**
 * Private route component.
 * Use to create pages that require authentication
 */
class PrivateRoute extends Component {
  /**
   * Render private route component
   * @return {*} - returns desired component if user is authenticated,
   * otherwise redirects to login page
   */
  render() {
    const { component: Component, authentication, ...rest } = this.props;
    return (
      <Route {...rest} render={
        props => authentication.loggedIn ?
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

/**
 * Map component's state to props to inject authentication state
 * @param {object} state - auth state
 * @return {{authentication: *}} - component's properties
 */
function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication,
  };
}

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  component: func.isRequired,
  authentication: shape({
    loggedIn: bool,
  }),
};
