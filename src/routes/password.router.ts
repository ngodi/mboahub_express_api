import { Router } from 'express';
import { passwordController } from '../controllers/password.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';

export const passwordRouter = Router();

passwordRouter.post('/forgot', passwordController.forgot);
passwordRouter.post('/verify', passwordController.verify);
passwordRouter.post('/reset', passwordController.reset);
passwordRouter.post('/change', isAuthenticated, passwordController.change);
