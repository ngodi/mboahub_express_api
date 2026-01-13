import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class UserController {
  currentUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.currentUser;

    if (user) {
      return res.status(StatusCodes.OK).json({
        message: 'User retrieved successfully',
        data: user,
      });
    }
  };
}

export const userController = new UserController();
