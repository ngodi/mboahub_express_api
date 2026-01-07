import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import qs from 'qs';
import { config } from '../config';

export const standardMiddlewares = (app: Application) => {
  app.set('query parser', (str: string) => qs.parse(str));
  app.use(helmet());
  app.use(hpp());
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
