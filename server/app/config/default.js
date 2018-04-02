const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: {
      url: 'mongodb://localhost:27017',
      name: 'location',
    },
    port: process.env.PORT || 5000,
  },
};

export default config[env];