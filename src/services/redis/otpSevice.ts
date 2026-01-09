import Redis from 'ioredis';
import { config } from '../../config';
import { redisConnection } from '../../config/redisConnection';

export const OTP_KEY = (email: string) => ({
  base: `otp:${email}`,
  requestCount: `otp_request_count:${email}`,
  cooldown: `otp_cooldown:${email}`,
  requestAttempts: `otp_attempts:${email}`,
  lock: `otp_lock:${email}`,
  spamLock: `otp_spam_lock:${email}`,
});

export class OtpService {
  redis: Redis;

  constructor() {
    this.redis = redisConnection;
  }

  // base otp
  async setOtp(email: string, otp: string): Promise<void> {
    const key = OTP_KEY(email).base;
    const expiryInSeconds = config.OTP_EXPIRY;
    await this.redis.setex(key, expiryInSeconds, otp);
  }

  // `otp_request_count:${email}`;
  async getOtpRequestCount(email: string): Promise<number> {
    const key = OTP_KEY(email).requestCount;
    const count = await this.redis.get(key);
    return count ? parseInt(count, 10) : 0;
  }
  async setOtpCooldown(email: string): Promise<void> {
    const key = OTP_KEY(email).cooldown;
    const expiryInSeconds = config.OTP_REQUEST_WINDOW;
    await this.redis.setex(key, expiryInSeconds, 'true');
  }

  async setOtpLock(email: string, otp: string): Promise<void> {
    const key = OTP_KEY(email).lock;
    const expiryInSeconds = config.OTP_LOCK_WINDOW;
    await this.redis.setex(key, expiryInSeconds, 'locked');
  }

  // otp spam
  async setOtpSpamLock(email: string): Promise<void> {
    const key = OTP_KEY(email).spamLock;
    const expiryInSeconds = 3600; // 1 hour
    await this.redis.setex(key, expiryInSeconds, 'locked');
  }

  async isInOtpSpamLock(email: string): Promise<boolean> {
    const key = OTP_KEY(email).spamLock;
    const exists = await this.redis.exists(key);
    return exists === 1;
  }

  async isInOtpLock(email: string): Promise<boolean> {
    const key = OTP_KEY(email).lock;
    const exists = await this.redis.exists(key);
    return exists === 1;
  }

  async isInOtpCooldown(email: string): Promise<boolean> {
    const key = OTP_KEY(email).cooldown;
    const exists = await this.redis.exists(key);
    return exists === 1;
  }

  async getOtp(email: string): Promise<string | null> {
    const key = OTP_KEY(email).base;
    return await this.redis.get(key);
  }

  async deleteOtp(email: string): Promise<void> {
    const key = OTP_KEY(email).base;
    await this.redis.del(key);
  }

  async incrementOtpAttempts(email: string): Promise<number> {
    const key = OTP_KEY(email).requestAttempts;
    const attempts = await this.redis.incr(key);
    if (attempts === 1) {
      await this.redis.expire(key, config.OTP_ATTEMPTS_WINDOW);
    }
    return attempts;
  }

  async getOtpAttempts(email: string): Promise<number> {
    const key = OTP_KEY(email).requestAttempts;
    const attempts = await this.redis.get(key);
    return attempts ? parseInt(attempts, 10) : 0;
  }

  async resetOtpAttempts(email: string): Promise<void> {
    const key = OTP_KEY(email).requestAttempts;
    await this.redis.del(key);
  }
}

export const otpService: OtpService = new OtpService();
