import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../../errors/custom-error';
import { UserService } from '../users/user.service';
import { AuthHelpers } from '../../helpers/auth.helpers';
import { emailQueue } from '../../../queues/email.queue';

export const forgotPassword = async (email: string, next: NextFunction) => {
  try {
    const user = await UserService.existingUser(email);

    if (!user) throw new ValidationError('User not found!');

    await AuthHelpers.checkOtpRestrictions(email, next);
    await AuthHelpers.trackOtpRequests(email, next);

    await emailQueue.add('send-otp-email', {
      //job name
      to: email,
      name: user.name,
      subject: 'Forgot Password OTP!',
      templateName: 'forgot-password-mail',
    });

    return true;
  } catch (error) {
    return next(error);
  }
};
