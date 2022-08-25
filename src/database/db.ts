import mongoose from 'mongoose';
import config from '../config/index';

mongoose.connect(config.dbURL);
mongoose.Promise = global.Promise;

const db: mongoose.Connection = mongoose.connection;

export default db;
