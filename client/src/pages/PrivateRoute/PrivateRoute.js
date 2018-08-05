import React, { Component } from 'react';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import { func, shape, bool } from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
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
