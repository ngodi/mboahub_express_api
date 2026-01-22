import { changePassword } from './changePassword.service';
import { forgotPassword } from './forgotPassword.service';
import { loginUser } from './loginUser.service';
import { registerUser } from './registerUser.service';
import { updatePassword } from './updatePassword.service';
import { verifyEmailOtp } from './verifyEmailOtp.service';
import { verifyPasswordOtp } from './verifyPasswordOtp.service';

export const authService = {
  verifyEmailOtp,
  verifyPasswordOtp,
  loginUser,
  registerUser,
  forgotPassword,
  changePassword,
  updatePassword,
};
