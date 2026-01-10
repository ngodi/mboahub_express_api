import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { userController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/me', isAuthenticated, userController.currentUser);
