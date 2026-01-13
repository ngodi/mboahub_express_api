/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *
 *     VerifyPasswordOtpRequest:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         otp:
 *           type: string
 *           minLength: 6
 *           maxLength: 6
 *           example: "123456"
 *         newPassword:
 *           type: string
 *           minLength: 8
 *           maxLength: 255
 *           example: NewStrongPass123
 *
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           example: OldStrongPass123
 *         newPassword:
 *           type: string
 *           minLength: 8
 *           maxLength: 255
 *           example: NewStrongPass123
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     CookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *       description: Authentication via HTTP-only cookie
 */

/**
 * @swagger
 * tags:
 *   name: Password
 *   description: Password management
 */

/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset OTP sent to email
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/password/verify:
 *   post:
 *     summary: Verify OTP and reset password
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyPasswordOtpRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid OTP or validation error
 */

/**
 * @swagger
 * /api/v1/password/change:
 *   post:
 *     summary: Change password (authenticated user)
 *     tags: [Password]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
