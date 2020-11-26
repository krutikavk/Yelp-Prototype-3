require('dotenv').config();

const config = {
  secret: 'cmpe273_secret_key',
  frontendURL: process.env.REACT_APP_FRONTEND,
  mongoDB: process.env.REACT_APP_MONGO_DB,
};

module.exports = config;
