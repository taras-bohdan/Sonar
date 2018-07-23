import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// Material
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Login from './login/Login';
import { PageNotFound } from './page-not-found/page-not-found';
import { PrivateRoute } from './shared/PrivateRoute/PrivateRoute';
import { Auth } from './shared/Auth/Auth';


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
  auth = new Auth();

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path='/' isAuthenticated={this.auth.isAuthenticated} component={Protected}/>
          <Route exact path='/login' render={(props) => <Login {...props} authService={this.auth}/>}/>
          <Route component={PageNotFound}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
