import { NextFunction, Request, Response } from 'express';
import { registerUser, verifyEmailOtp } from '../services/db/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const result = await registerUser(req.body, next);
    if (result) {
      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email for activation',
      });
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    const user = await verifyEmailOtp(email, otp, next);
    if (user) {
      return res.status(StatusCodes.OK).json({
        message: 'Email verified successfully',
        data: user,
      });
    }
  };
}

export const authController = new AuthController();
