import { config } from './config';
import { checkRedisConnection } from './config/redisConnection';
import { connectWithRetry } from './connectDb';
import { UserModel } from './interfaces/user.interface';
import { emailWorker } from './workers/email.worker';
import './models';

const PORT = config.PORT || 6000;

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserModel;
    }
  }
}

connectWithRetry();
checkRedisConnection();
emailWorker;

export const startServer = async (app: any) => {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return server;
};
