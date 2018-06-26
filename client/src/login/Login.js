import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import posed from 'react-pose';

import Logo from '../logo/Logo';

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
  },
});


class Login extends Component {
  state = {
    hovering: false,
    showLoginForm: false,
    email: null,
    password: null,
  };

  scaleOnHover(hovering) {
    this.setState({ hovering });
  }

  get logoState() {
    if (this.state.showLoginForm) {
      return 'showLogin';
    }

    return this.state.hovering ? 'hovered' : 'idle';
  }

  login() {

    fetch('/user/signIn', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      mode: 'cors',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.loginPage}>
        <LogoContainer
          pose={this.logoState}
          onMouseEnter={() => this.scaleOnHover(true)}
          onMouseLeave={() => this.scaleOnHover(false)}
          onClick={() => !this.state.showLoginForm && this.setState({ showLoginForm: true })}
        >
          <Logo/>
        </LogoContainer>
        <LoginForm className={classes.loginForm}
                   pose={this.state.showLoginForm ? 'visible' : 'hidden'}
        >
          <TextField
            required
            type="email"
            id="email"
            label="Email"
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
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
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
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.login.bind(this)}
            >Login</Button>
          </div>
        </LoginForm>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
