import { NextFunction } from 'express';
import { NotFoundError } from '../../errors/custom-error';
import { UserCreationAttributes } from '../../interfaces/user.interface';
import { User } from '../../models/users';
import { BcryptLib } from '../../libs/bcrypt.lib';

export class UserService {
  static existingUser = async (email: string) => {
    let user = null;
    try {
      user = await User.findOne({ where: { email } });
      return user;
    } catch {
      if (user === null) return null;
    }
  };

  static createUser = async (
    payload: UserCreationAttributes,
    next: NextFunction
  ) => {
    try {
      payload.password = await BcryptLib.hashPassword(payload.password!);
      const user = await User.create(payload);
      return user || null;
    } catch (error) {
      return next(error);
    }
  };
}
