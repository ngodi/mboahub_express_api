import { NotAuthorizedError } from '../errors/custom-error';
import jwt from 'jsonwebtoken';
import { UserCache } from '../services/redis/cache/user.cache';

export const isAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const token =
      req?.cookies?.['access_token'] ||
      req?.headers?.['authorization']?.split(' ')[1];
    if (!token) {
      return next(new NotAuthorizedError('Authentication token is missing'));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
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
