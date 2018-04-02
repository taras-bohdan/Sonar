require('babel-register')({
  presets: ["es2015"],
});
// require the rest of the app that needs to be transpiled after the hook
require('./app');