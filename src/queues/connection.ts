import { ConnectionOptions } from 'bullmq';
import { config } from '../config';

export const redisConnectionQueue: ConnectionOptions = {
  host: config.REDIS_HOST as string,
  port: 6379,
};
