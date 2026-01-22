import { NextFunction } from 'express';
import { BadRequestError } from '../../../errors/custom-error';
import { BcryptLib } from '../../../libs/bcrypt.lib';
import { UserModel } from '../../../interfaces/user.interface';

export const updatePassword = async (
  password: string,
  user: UserModel,
  next: NextFunction
) => {
  try {
    const isMatch = await BcryptLib.comparePassword(password, user.password!);

    if (!isMatch) {
      throw new BadRequestError('Password must not be a previously used');
    }

    const hashedPassword = await BcryptLib.hashPassword(password);
    await user.update({ password: hashedPassword });
    return true;
  } catch (error) {
    return next(error);
  }
};
