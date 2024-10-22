import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { env } from './utils/env.js';

import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import logger from './middlewares/logger.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}