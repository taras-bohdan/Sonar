import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Login from './pages/Login/Login';
import Administration from './pages/Administration/Administration';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Alert from './components/Alert/Alert';


export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#757ce8',
      main: '#03DAC6',
      // dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  props: {
    TextField: {},
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
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path='/' component={Administration}/>
          <Route exact path='/login' render={(props) => <Login {...props}/>}/>
          <Route component={PageNotFound}/>
        </Switch>
        <Alert/>
      </MuiThemeProvider>
    );
  }
}

/**
 * Map state to component properties
 */
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = withRouter(connect(mapStateToProps)(App));

export default connectedApp;
