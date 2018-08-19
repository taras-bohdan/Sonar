import React, { Component } from 'react';
import posed from 'react-pose';
import { Redirect } from 'react-router-dom';
import { object, bool, func } from 'prop-types';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import { userActions } from '../../actions';
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
   * Dispatch login action
   * @returns {void}
   */
  login = () => {
    const { dispatch } = this.props;
    dispatch(userActions.login(this.state.username, this.state.password));
  };

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
   * Create function to set field value into state on change
   * @param {string} fieldName - name of field (login/password)
   * @returns {function(*): void} - update state funciton
   */
  onTextFieldChange = (fieldName) => {
    return (event) => this.setState({ [fieldName]: event.target.value });
  };

  /**
   * Render component
   * @returns {*} - component's HTML
   */
  render() {
    const { classes, loggedIn, loggingIn } = this.props;
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
          <TextField
            required
            id="username"
            label="Username"
            className={classes.textField}
            margin="normal"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputLabel,
                input: classes.inputLabel,
              },
            }}
            onChange={this.onTextFieldChange('username')}
          />
          <TextField
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputLabel,
                input: classes.inputLabel,
              },
            }}
            onChange={this.onTextFieldChange('password')}
          />
          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.login}
            >Login</Button>
            {loggingIn && <LinearProgress/>}
          </div>
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
