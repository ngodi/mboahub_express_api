import { NextFunction, Response } from 'express';
import { UserCreationAttributes } from '../../../interfaces/user.interface';
import {
  NotAuthorizedError,
  NotFoundError,
  ValidationError,
} from '../../../errors/custom-error';
import { AuthHelpers } from '../../helpers/auth.helpers';
import { emailQueue } from '../../../queues/email.queue';
import { UserService } from '../users/user.service';
import { User } from '../../../models/users';
import { BcryptLib } from '../../../libs/bcrypt.lib';
import jwt from 'jsonwebtoken';
import { setCookie } from '../../helpers/cookieSettings';

export const verifyEmailOtp = async (
  email: string,
  otp: string,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(email);

    if (!user) {
      return next(new ValidationError('User with provided email not found!'));
    }

    await AuthHelpers.verifyOtp(email, otp, next);
    await User.update({ emailVerified: true }, { where: { email } });
    return user;
  } catch (error) {
    return next(error);
  }
};
