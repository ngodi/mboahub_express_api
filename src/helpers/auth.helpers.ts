import { NextFunction } from 'express';
import { ValidationError } from '../errors/custom-error';
import { OTP_KEY, otpService } from '../services/redis/otpSevice';
import { redisConnection } from '../config/redisConnection';
import { generateOtp } from '../libs/crypto.lib';
import { emailQueue } from '../queues/email.queue';

export class AuthHelpers {
  static async checkOtpRestrictions(email: string, next: NextFunction) {
    if (await otpService.isInOtpLock(email)) {
      throw new ValidationError(
        'Account locked due to multiple failed attempts! Try again after 30 minutes'
      );
    }

    if (await otpService.isInOtpSpamLock(email)) {
      throw new ValidationError(
        'Too many OTP requests! Please wait 1 hour before requesting again.'
      );
    }

    if (await otpService.isInOtpCooldown(email)) {
      throw new ValidationError(
        'Please wait 1 minute before requesting a new OTP!'
      );
    }
  }

  static async trackOtpRequests(email: string, next: NextFunction) {
    const otpRequests = await otpService.getOtpRequestCount(email);

    if (otpRequests >= 2) {
      await otpService.setOtpSpamLock(email);

      throw new ValidationError(
        'Too many OTP requests, Please wait 1 hour before requesting again.'
      );
    }

    await redisConnection.set(
      OTP_KEY(email).requestCount,
      otpRequests + 1,
      'EX',
      3600
    );
  }

  static async verifyOtp(email: string, otp: string, next: NextFunction) {
    const storedOtp = await otpService.getOtp(email);

    if (!storedOtp) {
      throw new ValidationError('Invalid or expired OTP!');
    }

    const failedAttemptsKey = `otp_attempts:${email}`;
    const failedAttempts = parseInt(
      (await redisConnection.get(failedAttemptsKey)) || '0'
    );

    if (storedOtp !== String(otp)) {
      if (failedAttempts >= 2) {
        await redisConnection.set(`otp_lock:${email}`, 'locked', 'EX', 1800);
        await redisConnection.del(`otp:${email}`, failedAttemptsKey);
      }
      await redisConnection.set(
        failedAttemptsKey,
        failedAttempts + 1,
        'EX',
        300
      );
      throw new ValidationError(
        `Incorrect OTP. ${2 - failedAttempts} attempts left.`
      );
    }

    await redisConnection.del(`otp:${email}`, failedAttemptsKey);
  }

  static async sendOtp(
    payload: {
      email: string;
      name?: string | null;
      subject: string;
      templateName: string;
    },
    next: NextFunction
  ) {
    try {
      await AuthHelpers.checkOtpRestrictions(payload.email, next);
      await AuthHelpers.trackOtpRequests(payload.email, next);

      const otp = generateOtp();

      await otpService.setOtp(payload.email, otp);
      await otpService.setOtpCooldown(payload.email);

      await emailQueue.add('send-otp-email', {
        //job name
        to: payload.email,
        name: payload.name || '',
        subject: payload.subject,
        otp,
        templateName: payload.templateName,
      });

      return true;
    } catch (error) {
      return next(error);
    }
  }
}
