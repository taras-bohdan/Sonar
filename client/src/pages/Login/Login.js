import React, { Component } from 'react';
import posed from 'react-pose';
import { Redirect } from 'react-router-dom';
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import Logo from '../../components/Logo/Logo';


const LogoContainer = posed.div({
  idle: {
    scale: 1,
  },
  hovered: {
    scale: 1.2,
  },
  showLogin: {
    scale: 0.8,
  },
});

const LoginForm = posed.div({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

const styles = theme => ({
  loginPage: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loginForm: {
    width: '15em',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textField: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
  inputLabel: {
    color: theme.palette.primary.main,
  },
});

/**
 * Login component
 */
class Login extends Component {
  state = {
    hovering: false,
    showLoginForm: false,
    email: null,
    password: null,
  };

  /**
   * Set hovering state to scale logo
   * @param {boolean} hovering - hovered state
   * @return {void}
   */
  scaleOnHover(hovering) {
    this.setState({ hovering });
  }

  /**
   * Get logo state
   * @returns {string} - logo state
   */
  get logoState() {
    if (this.state.showLoginForm) {
      return 'showLogin';
    }

    return this.state.hovering ? 'hovered' : 'idle';
  }

  /**
   * Set hover state to true
   * @returns {void}
   */
  onMouseEnter = () => {
    this.scaleOnHover(true);
  };

  /**
   * Set hover state to false
   * @returns {void}
   */
  onMouseLeave = () => {
    this.scaleOnHover(false);
  };

  /**
   * Show login form on click
   * @returns {void}
   */
  onLogoClick = () => {
    !this.state.showLoginForm && this.setState({ showLoginForm: true });
  };

  /**
   * Render component
   * @returns {*} - component's HTML
   */
  render() {
    const { classes, loggedIn } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (loggedIn) {
      return <Redirect to={from}/>;
    }

    return (
      <div className={classes.loginPage}>
        <LogoContainer
          pose={this.logoState}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onLogoClick}
        >
          <Logo/>
        </LogoContainer>
        <LoginForm className={classes.loginForm}
                   pose={this.state.showLoginForm ? 'visible' : 'hidden'}
        >
          <Button
            color="primary"
            className={classes.button}
            href="auth/google"
          >Login with google</Button>
        </LoginForm>
      </div>
    );
  }
}

/**
 * Map state to component properties
 * @param {object} state - component's state
 * @return {object} - component properties
 */
function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication;
  return {
    loggingIn,
    loggedIn,
  };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Login));

Login.propTypes = {
  classes: object.isRequired,
  dispatch: func,
  loggedIn: bool,
  loggingIn: bool,
  location: object,
};
