import Redis from 'ioredis';
import { config } from '.';

export const redisConnection = new Redis(config.REDIS_URL, {
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redisConnection.on('connect', () => {
  console.log('Redis Client Connected');
});

redisConnection.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export const checkRedisConnection = async () => {
  if (!redisConnection) return;
  try {
    const pong = await redisConnection.ping();
    if (pong === 'PONG') {
      console.log('Redis is running');
    }
  } catch (err) {
    console.log('Redis is not running:', err);
    process.exit(1); // Exit app if Redis is critical
  }
};
