const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'https://backend:5500/',
    secure: false,
  }));
  app.use(proxy('/auth/google', {
    target: 'https://backend:5500/',
    logLevel: 'debug',
    secure: false,
  }));
};
