const cf = require('dotenv').config();

const config = {
  port: process.env.PORT,

  db: {
    fullUrl: process.env.DB_FULL_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },

  jwt: {
    SECRET_KEY: process.env.JWT_SECRET,
    TOKEN_EXPIRE: process.env.TOKEN_EXPIRE
  },

//   redis: {
//     name: process.env.REDIS_NAME,
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT
//   },

  secretKey: process.env.SECRET_KEY
};

export default config;
