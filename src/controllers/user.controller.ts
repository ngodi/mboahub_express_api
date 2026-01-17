import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/custom-error';

class UserController {
  currentUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.currentUser;
    if (!user) {
      throw new NotFoundError('User Not found');
    }
    return res.status(StatusCodes.OK).json({
      message: 'User retrieved successfully',
      data: user,
    });
  };
}

export const userController = new UserController();
