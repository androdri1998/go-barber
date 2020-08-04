/* eslint-disable import/first */
import 'reflect-metadata';

import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

import express from 'express';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
