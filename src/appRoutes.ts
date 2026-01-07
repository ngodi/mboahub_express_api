import { Application, Response, Request } from 'express';

export const appRoutes = (app: Application) => {
  app.get('', (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ success: true, message: 'API server is up and running!!' });
  });
};
