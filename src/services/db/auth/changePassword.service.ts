import { NextFunction } from 'express';
import { NotAuthorizedError } from '../../../errors/custom-error';
import { BcryptLib } from '../../../libs/bcrypt.lib';
import { UserModel } from '../../../interfaces/user.interface';

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  user: UserModel,
  next: NextFunction
) => {
  try {
    const isMatch = await BcryptLib.comparePassword(
      currentPassword,
      user.password!
    );

    if (!isMatch) {
      throw new NotAuthorizedError('Current password is incorrect!');
    }

    const hashedPassword = await BcryptLib.hashPassword(newPassword);
    await user.update({ password: hashedPassword });
    return user;
  } catch (error) {
    return next(error);
  }
};
