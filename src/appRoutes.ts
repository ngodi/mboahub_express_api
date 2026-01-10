import { Application, Response, Request, NextFunction } from 'express';
import { NotFoundError } from './errors/custom-error';
import { authRouter } from './routes/auth.router';
import { passwordRouter } from './routes/password.router';
import { userRouter } from './routes/user.router';

export const appRoutes = (app: Application) => {
  app.get('/health', (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ success: true, message: 'API server is up and running!!' });
  });

  // auth routes
  app.use('/api/v1/auth', authRouter);

  // password routes
  app.use('/api/v1/password', passwordRouter);

  app.use('/api/v1/users', userRouter);

  app.use((req: Request, res: Response, _next: NextFunction) => {
    throw new NotFoundError('Route not found', 'ROUTE_NOT_FOUND');
  });
};
