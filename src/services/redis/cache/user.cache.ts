import { redisConnection } from '../../../config/redisConnection';
import { User } from '../../../models/users';
import { CACHE_TTL } from './constants';
import { cacheKeys } from './keys';

export class UserCache {
  // Read-through cache
  static async getCachedUserById(userId: string) {
    const key = cacheKeys.userById(userId);

    // Try cache
    const cached = await redisConnection.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fallback to DB
    const user = await User.findByPk(userId);
    if (!user) return null;

    // Store in cache
    await redisConnection.set(key, JSON.stringify(user), 'EX', CACHE_TTL.USER);

    return user;
  }

  static async invalidateUserCache(userId: string, email?: string) {
    const keys = [
      cacheKeys.userById(userId),
      email ? cacheKeys.userByEmail(email) : null,
    ].filter(Boolean) as string[];

    if (keys.length) {
      await redisConnection.del(keys);
    }
  }
}
