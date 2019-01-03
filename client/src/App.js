import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Login from './pages/Login';
import Administration from './pages/Administration';
import { PageNotFound } from './pages/PageNotFound';
import PrivateRoute from './pages/PrivateRoute';
import Alert from './components/Alert/Alert';
import { Callback } from './components/Callback';
import AppNavBar from './components/UI/AppNavBar';
import AppDrawer from './components/UI/AppDrawer';
import PropTypes from 'prop-types';
import Dashboard from './pages/Dashboard';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#03DAC6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
  props: {
    TextField: {},
  },
});

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.mixins.toolbar.minHeight,
  },
});

/**
 * Main app component
 */
class App extends Component {
  /**
   * Render component
   * @returns {*} - components HTML structure
   */
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <AppNavBar/>
        <AppDrawer/>
        <main className={classes.content}>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard}/>
            <PrivateRoute exact path='/users' component={Administration}/>
            <Route path='/callback' component={Callback}/>
            <Route exact path='/login' render={(props) => <Login {...props}/>}/>
            <Route component={PageNotFound}/>
          </Switch>
        </main>
        <Alert/>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

/**
 * Map state to component properties
 * @param {object} state - app state
 * @returns {object} - component props with state
 */
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = withStyles(styles)(withRouter(connect(mapStateToProps)(App)));

export default connectedApp;
