import { body } from 'express-validator';
import { UserStatusType } from '../types/user.types';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must be at least 8 characters long'),

  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be between 3 and 30 characters')
    .trim(),

  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 9, max: 18 })
    .withMessage('Phone number must be between 9 and 18 characters')
    .trim(),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(Object.keys(UserStatusType))
    .withMessage(
      `Status must be one of ${Object.keys(UserStatusType).join(', ')}`
    ),

  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isLength({ max: 25 })
    .withMessage('City must not exceed 25 characters')
    .trim(),

  body('country')
    .notEmpty()
    .withMessage('Country is required')
    .isLength({ max: 25 })
    .withMessage('Country must not exceed 25 characters')
    .trim(),
];

export const verifyOtpValidator = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 characters long')
    .trim(),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must be at least 8 characters long')
    .trim(),
];
