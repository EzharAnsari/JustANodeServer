import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });

export default {
  port: parseInt(process.env.PORT ? process.env.PORT : '3000'),
  dbURL: process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/JustAMongodbDatabase',
  session: {
    name: 'SID',
    secret: 'SID',    // Make a secret key complex
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
  },
  newsAPIKey: '?',   // you can get news api key on https://newsapi.org/
};
