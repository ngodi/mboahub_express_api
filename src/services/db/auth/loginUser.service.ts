import { NextFunction, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
} from '../../../errors/custom-error';
import { UserService } from '../user/user.service';
import { BcryptLib } from '../../../libs/bcrypt.lib';
import jwt from 'jsonwebtoken';
import { setCookie } from '../../helpers/cookieSettings';

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

    const isMatch = await BcryptLib.comparePassword(
      password,
      user?.dataValues?.password!
    );

    if (!isMatch) {
      return next(new NotAuthorizedError('Invalid email or password'));
    }

    const accessToken = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name,
      },
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
