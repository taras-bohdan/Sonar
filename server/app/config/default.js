const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: {
      url: 'mongodb://localhost:27017',
      name: 'location',
    },
    port: process.env.PORT || 5500,
    logs: {
      dir: 'logs',
      fileName: 'log'
    }
  },
};

export default config[env];
