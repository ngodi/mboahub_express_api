import { NotAuthorizedError } from '../errors/custom-error';
import jwt from 'jsonwebtoken';
import { UserCache } from '../services/redis/cache/user.cache';
import { config } from '../config';

export const isAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const accessToken = req?.cookies?.access_token;

    if (!accessToken) {
      return next(new NotAuthorizedError('Authentication cookie is missing'));
    }

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET) as {
      id: string;
      email: string;
      name: string;
    };

    const user = await UserCache.getCachedUserById(decoded.id);

    req.currentUser = user;
    next();
  } catch (error) {
    return next(error);
  }
};
