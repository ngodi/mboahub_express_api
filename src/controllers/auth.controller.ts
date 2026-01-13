import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/db/auth';

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
}

export const authController = new AuthController();
