/* eslint-disable import/first */
import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

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
