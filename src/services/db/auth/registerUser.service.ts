import { NextFunction } from 'express';
import { UserCreationAttributes } from '../../../interfaces/user.interface';
import { UniqueConstraintError } from '../../../errors/custom-error';
import { AuthHelpers } from '../../../helpers/auth.helpers';
import { UserService } from '../users/user.service';
export const registerUser = async (
  payload: UserCreationAttributes,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(payload.email);

    if (user) {
      return next(
        new UniqueConstraintError('User already exists with this email!')
      );
    }
    await AuthHelpers.sendOtp(
      {
        email: payload.email,
        name: payload.name,
        subject: 'User OTP Verification',
        templateName: 'otp-activation-mail',
      },
      next
    );
    await UserService.createUser(payload, next);

    return true;
  } catch (error) {
    return next(error);
  }
};
