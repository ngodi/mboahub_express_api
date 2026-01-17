import { Response } from 'express';
import { config } from '../config';

export const setCookie = (res: Response, name: string, value: string) => {
  const isProd = config.NODE_ENV === 'production';

  res.cookie(name, value, {
    httpOnly: true,
    secure: false, // OK on localhost, true for prod
    sameSite: 'lax', // for localhost, none for prod
    path: '/',
  });
};
