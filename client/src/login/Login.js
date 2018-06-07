import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import posed from 'react-pose';

import Logo from '../logo/Logo';

const LogoContainer = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.2 },
});

const LoginForm = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
});


class Login extends Component {
  state = {
    hovering: false,
    showLoginForm: false,
  };

  scaleOnHover(hovering) {
    this.setState({ hovering });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.loginPage}>
        <LogoContainer
          pose={this.state.hovering ? 'hovered' : 'idle'}
          onMouseEnter={() => this.scaleOnHover(true)}
          onMouseLeave={() => this.scaleOnHover(false)}
          onClick={() => this.setState({ showLoginForm: true })}
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
          />
          <TextField
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
          />
          <Button
            color="primary"
            className={classes.button}
          >Login</Button>
        </LoginForm>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);