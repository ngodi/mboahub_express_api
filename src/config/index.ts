import dotenv from 'dotenv';
dotenv.config();

class Config {
  PORT: string;
  CLIENT_URL: string;
  REDIS_URL: string = process.env.REDIS_URL || 'redis://localhost:6379';
  REDIS_HOST: String;
  OTP_EXPIRY: number;
  OTP_LENGTH: number;
  OTP_ATTEMPTS_LIMIT: number;
  OTP_REQUEST_LIMIT: number;
  OTP_REQUEST_WINDOW: number;
  OTP_ATTEMPTS_WINDOW: number;
  OTP_LOCK_WINDOW: number;

  constructor() {
    this.PORT = process.env.PORT! || '6000';
    this.CLIENT_URL = process.env.CLIENT_URL!;
    this.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    this.REDIS_HOST = process.env.REDIS_HOST!;
    this.OTP_EXPIRY = parseInt(process.env.OTP_EXPIRY!) || 300;
    this.OTP_LENGTH = parseInt(process.env.OTP_LENGTH!) || 6;
    this.OTP_ATTEMPTS_LIMIT = parseInt(process.env.OTP_ATTEMPTS_LIMIT!) || 5;
    this.OTP_REQUEST_LIMIT = parseInt(process.env.OTP_REQUEST_LIMIT!) || 3;
    this.OTP_REQUEST_WINDOW = parseInt(process.env.OTP_REQUEST_WINDOW!) || 60;
    this.OTP_ATTEMPTS_WINDOW =
      parseInt(process.env.OTP_ATTEMPTS_WINDOW!) || 900;
    this.OTP_LOCK_WINDOW = parseInt(process.env.OTP_LOCK_WINDOW!) || 1800;
  }
}

export const config = new Config();
