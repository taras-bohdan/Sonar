import React, { Component } from 'react';
import 'whatwg-fetch';
// Material
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './App.css';
import Login from './login/Login';


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
});


class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    /*this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));*/
  }

  /*callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };*/

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Login/>
      </MuiThemeProvider>
    );
  }
}

export default App;
