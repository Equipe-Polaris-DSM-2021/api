import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import routes from './routes';

const app = express();

const mongoConnect = async () => {
  await mongoose.connect(`${process.env.MONGODB_CLUSTER}`).then(() => {
    console.log('Successfully connected database')
  });
  mongoose.Promise = global.Promise;
}
mongoConnect()


app.use(express.json());
app.use(cors())
app.use(routes);

module.exports = app