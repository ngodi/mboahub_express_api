import { Application, Response, Request, NextFunction } from 'express';
import { NotFoundError } from './errors/custom-error';

export const appRoutes = (app: Application) => {
  app.get('/health', (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ success: true, message: 'API server is up and running!!' });
  });

  app.use((req: Request, res: Response, _next: NextFunction) => {
    throw new NotFoundError('Route not found', 'ROUTE_NOT_FOUND');
  });
};
