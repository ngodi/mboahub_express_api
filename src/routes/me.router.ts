import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { userController } from '../controllers/user.controller';

export const meRouter = Router();

meRouter.get('/', isAuthenticated, userController.currentUser);
