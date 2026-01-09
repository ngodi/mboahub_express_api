import { config } from './config';
import { checkRedisConnection } from './config/redisConnection';
import { connectWithRetry } from './connectDb';
import { emailWorker } from './workers/email.worker';

const PORT = config.PORT || 6000;

connectWithRetry();
checkRedisConnection();
emailWorker;

export const startServer = async (app: any) => {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return server;
};
