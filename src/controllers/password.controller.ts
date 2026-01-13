import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotAuthorizedError, ValidationError } from '../errors/custom-error';
import { authService } from '../services/db/auth';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../models/users';

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
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
        return next(
          new ValidationError('Email, OTP, and new password are required!')
        );
      }
      await authService.verifyPasswordOtp(email, newPassword, otp, next);

      res
        .status(200)
        .json({ message: 'OTP verified. Password change successfully.' });
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
}

export const passwordController = new PasswordController();
