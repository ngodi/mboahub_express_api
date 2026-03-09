import { NextFunction, Response } from 'express';
import { ValidationError } from '../../../errors/custom-error';
import { AuthHelpers } from '../../../helpers/auth.helpers';
import { UserService } from '../users/user.service';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { setCookie } from '../../../helpers/cookieSettings';

export const verifyPasswordOtp = async (
  email: string,
  otp: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(email);

    if (!user) {
      return next(new ValidationError('User with provided email not found!'));
    }

    await AuthHelpers.verifyOtp(email, otp, next);
    // generate passwordResetToken
    const passwordResetToken = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    setCookie(res, 'password_reset_token', passwordResetToken);
    return true;
  } catch (error) {
    return next(error);
  }
};
