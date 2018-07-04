import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// Material
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Login from './login/Login';
import { PageNotFound } from './page-not-found/page-not-found';


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


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route component={PageNotFound}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
