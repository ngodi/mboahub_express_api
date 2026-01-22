import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  NotAuthorizedError,
  NotFoundError,
  ValidationError,
} from '../errors/custom-error';
import { authService } from '../services/db/auth';
import { UserInterface } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserService } from '../services/db/users/user.service';

class PasswordController {
  forgot = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      throw new ValidationError('Email is required');
    }
    const result = await authService.forgotPassword(email, next);

    if (result) {
      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email',
      });
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return next(
          new ValidationError('Email, OTP, and new password are required!')
        );
      }
      await authService.verifyPasswordOtp(email, otp, res, next);

      res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
      return next(error);
    }
  };

  change = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return next(
          new ValidationError('Current password and new password are required!')
        );
      }

      const currentUser = req.currentUser as UserInterface;

      if (!currentUser) {
        return next(new NotAuthorizedError('User not authenticated'));
      }
      const user = await authService.changePassword(
        currentPassword,
        newPassword,
        currentUser as any,
        next
      );

      res
        .status(200)
        .json({ message: 'Password changed successfully.', data: user });
    } catch (error) {
      return next(error);
    }
  };

  reset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, passwordConfirmation } = req.body;
      if (!password || !passwordConfirmation) {
        return next(
          new ValidationError(
            'password and password confirmation are required!'
          )
        );
      }

      if (password !== passwordConfirmation) {
        return next(
          new ValidationError('password and password confirmation do not match')
        );
      }

      const passwordResetToken = req?.cookies?.password_reset_token;

      if (!passwordResetToken) {
        return next(new NotAuthorizedError('Authentication cookie is missing'));
      }

      const decoded = jwt.verify(
        passwordResetToken,
        config.ACCESS_TOKEN_SECRET
      ) as {
        id: string;
        email: string;
      };

      if (!decoded) {
        return next(new NotAuthorizedError('User not authenticated'));
      }

      const user = await UserService.existingUser(decoded.email);

      if (!user) {
        throw new NotFoundError('User with email does not exist');
      }

      await authService.updatePassword(password, user, next);

      res
        .status(200)
        .json({ message: 'Password changed successfully.', data: user });
    } catch (error) {
      return next(error);
    }
  };
}

export const passwordController = new PasswordController();
// const hashedPassword = await BcryptLib.hashPassword(newPassword);
// await User.update({ password: hashedPassword }, { where: { email } });
