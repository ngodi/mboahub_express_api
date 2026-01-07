import dotenv from 'dotenv';
dotenv.config();

class Config {
  PORT: string;
  CLIENT_URL: string;

  constructor() {
    this.PORT = process.env.PORT! || '6000';
    this.CLIENT_URL = process.env.CLIENT_URL!;
  }
}

export const config = new Config();
