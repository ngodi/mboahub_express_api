import { config } from './config';
import { connectWithRetry } from './connectDb';

const PORT = config.PORT || 6000;

connectWithRetry();

export const startServer = async (app: any) => {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return server;
};
