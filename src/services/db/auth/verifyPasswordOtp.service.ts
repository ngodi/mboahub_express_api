import { NextFunction, Response } from 'express';
import { ValidationError } from '../../../errors/custom-error';
import { AuthHelpers } from '../../helpers/auth.helpers';
import { UserService } from '../users/user.service';
import { User } from '../../../models/users';
import { BcryptLib } from '../../../libs/bcrypt.lib';

export const verifyPasswordOtp = async (
  email: string,
  newPassword: string,
  otp: string,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(email);

    if (!user) {
      return next(new ValidationError('User with provided email not found!'));
    }

    await AuthHelpers.verifyOtp(email, otp, next);

    const hashedPassword = await BcryptLib.hashPassword(newPassword);
    await User.update({ password: hashedPassword }, { where: { email } });
    return user;
  } catch (error) {
    return next(error);
  }
};
