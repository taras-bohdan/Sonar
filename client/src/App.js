import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Login from './pages/LoginPage/Login';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';


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

const Protected = () => <h3>Protected</h3>;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path='/' component={Protected}/>
          <Route exact path='/login' render={(props) => <Login {...props}/>}/>
          <Route component={PageNotFound}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = withRouter(connect(mapStateToProps)(App));

export default connectedApp;
