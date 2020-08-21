/* eslint-disable import/first */
import 'reflect-metadata';

import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({
  path: '.env',
});

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '../typeorm';
import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res
    .status(500)
    .json({ status: 'error', error: 'Internal server error' });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀️ Server started on port 3333!');
});
