import { Router } from 'express';
import {
  loginValidator,
  registerValidator,
  verifyOtpValidator,
} from '../validators/auth.validators';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../validators/validateRequests';
import { isAuthenticated } from '../middleware/isAuthenticated';

export const authRouter = Router();

authRouter.post(
  '/register',
  registerValidator,
  validateRequest,
  authController.register
);
authRouter.post(
  '/verify',
  verifyOtpValidator,
  validateRequest,
  authController.verifyOtp
);

authRouter.post('/otp-resend', authController.resendOtp);

authRouter.post(
  '/login',
  loginValidator,
  validateRequest,
  authController.login
);

authRouter.delete('/logout', isAuthenticated, authController.logout);
