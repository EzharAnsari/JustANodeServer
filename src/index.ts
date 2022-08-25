import App from './App';

import config from './config/index';
import 'reflect-metadata';
import mongoose from 'mongoose';
import db from './database/db';

console.log({
  type: 'mongodb',
  host: config.dbURL,
  ApplicationPort: config.port,
  database: 'coreyo',
});

db.once('open', () => {
  console.log('database connected!');
  const app = new App();

  app.listen();
});

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
