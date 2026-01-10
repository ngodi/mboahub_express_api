import { NextFunction } from 'express';
import { UserCreationAttributes } from '../../../interfaces/user.interface';
import { ValidationError } from '../../../errors/custom-error';
import { AuthHelpers } from '../../helpers/auth.helpers';
import { emailQueue } from '../../../queues/email.queue';
import { UserService } from '../user/user.service';

export const registerUser = async (
  payload: UserCreationAttributes,
  next: NextFunction
) => {
  try {
    const user = await UserService.existingUser(payload.email);

    if (user) {
      return next(new ValidationError('User already exists with this email!'));
    }

    await AuthHelpers.checkOtpRestrictions(payload.email, next);
    await AuthHelpers.trackOtpRequests(payload.email, next);
    await emailQueue.add('send-otp-email', {
      //job name
      to: payload.email,
      name: payload.name,
      subject: 'User Activation OTP!',
      templateName: 'user-activation-mail',
    });
    await UserService.createUser(payload, next);

    return true;
  } catch (error) {
    return next(error);
  }
};
