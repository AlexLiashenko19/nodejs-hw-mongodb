import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import logger from './middlewares/logger.js';
dotenv.config();

const PORT = Number(env('PORT', '5000'));

export function setupServer() {
  const app = express();

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use("/contacts", contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}