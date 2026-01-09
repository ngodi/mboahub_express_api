import { Router } from 'express';
import { registerUserValidator } from '../validators/user.validators';
import { authController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/register', registerUserValidator, authController.register);
authRouter.post('/verify', authController.verifyOtp);
