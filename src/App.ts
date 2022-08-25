import express, { Request, Response, Router } from 'express';
import config from './config/index';
import logger from 'morgan';
import 'reflect-metadata';
import router from './routes/index';
import cookiesParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import CORS from './middlewares/cors';

export default class App {
  private app: express.Application;
  private port: number = config.port;

  constructor() {
    this.app = express();
    this.app.use(logger('dev'));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // cors
    this.app.get('*', CORS.allowCors);

    // session
    const MongoStore = connectMongo(session);
    this.app.use(cookiesParser());
    this.app.use(
      session({
        name: config.session.name,
        secret: config.session.secret,
        saveUninitialized: false,
        cookie: config.session.cookie,
        store: new MongoStore({
          url: config.dbURL,
        }),
      }),
    );

    router(this.app);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('Nodejs sever is started at http://localhost:' + this.port);
    });
  }
}
