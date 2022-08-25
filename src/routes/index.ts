import { Application } from 'express';

import user from './user';
import News from '../controller/news';
import Weather from '../controller/weather';

export default (app: Application) => {
  app.use('/user', user);

  app.get('/news', News.search);
  app.get('/weather', Weather.forecast);
};
