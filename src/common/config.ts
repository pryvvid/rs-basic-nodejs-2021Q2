import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;

// module.exports = {
//   PORT: process.env["PORT"],
//   NODE_ENV: process.env["NODE_ENV"],
//   MONGO_CONNECTION_STRING: process.env["MONGO_CONNECTION_STRING"],
//   JWT_SECRET_KEY: process.env["JWT_SECRET_KEY"],
//   AUTH_MODE: process.env["AUTH_MODE"] === 'true'
// };
