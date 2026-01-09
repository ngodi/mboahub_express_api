import { NextFunction, Response } from 'express';
import { UserCreationAttributes } from '../../interfaces/user.interface';
import {
  NotAuthorizedError,
  NotFoundError,
  ValidationError,
} from '../../errors/custom-error';
import { AuthHelpers } from '../helpers/auth.helpers';
import { emailQueue } from '../../queues/email.queue';
import { UserService } from './user.service';
import { User } from '../../models/users';
import { BcryptLib } from '../../libs/bcrypt.lib';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { setCookie } from '../helpers/cookieSettings';

export const registerUser = async (
  payload: UserCreationAttributes,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(payload.email);

    if (user) {
      return next(new ValidationError('User already exists with this email!'));
    }

    await AuthHelpers.checkOtpRestrictions(payload.email, next);
    await AuthHelpers.trackOtpRequests(payload.email, next);
    await emailQueue.add('otp-activation-queue', {
      to: payload.email,
      name: payload.name,
      subject: 'User Activation OTP!',
      templateName: 'user-activation-mail',
    });
    await UserService.createUser(payload, next);

    return true;
  } catch (error) {
    return next(error);
  }
};

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

export const loginUser = async (
  email: string,
  password: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(email);

    if (!user) {
      return next(new NotFoundError("User doesn't exists!"));
    }

    const isMatch = await BcryptLib.comparePassword(password, user.password!);

    if (!isMatch) {
      return next(new NotAuthorizedError('Invalid email or password'));
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' }
    );

    setCookie(res, 'refresh_token', refreshToken);
    setCookie(res, 'access_token', accessToken);

    return { user, accessToken, refreshToken };
  } catch (error) {
    return next(error);
  }
};
