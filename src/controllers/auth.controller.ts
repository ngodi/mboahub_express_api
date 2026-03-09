import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/db/auth';
import { AuthHelpers } from '../helpers/auth.helpers';
import { ValidationError } from '../errors/custom-error';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.registerUser(req.body, next);
    if (result) {
      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email for activation',
      });
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    const user = await authService.verifyEmailOtp(email, otp, next);
    if (user) {
      return res.status(StatusCodes.OK).json({
        message: 'Email verified successfully',
        data: user,
      });
    }
  };

  resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
      throw new ValidationError('Email is required');
    }
    await AuthHelpers.sendOtp(
      {
        email: req.body.email,
        subject: 'User OTP Verification',
        templateName: 'otp-activation-mail',
      },
      next
    );
    return res.status(StatusCodes.OK).json({
      message: 'OTP sent successfully',
    });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = (await authService.loginUser(
      email,
      password,
      res,
      next
    )) as any;

    if (user) {
      return res.status(StatusCodes.OK).json({
        message: 'Login successful!',
        data: { user, accessToken, refreshToken },
      });
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.status(StatusCodes.NO_CONTENT).json();
  };
}

export const authController = new AuthController();
