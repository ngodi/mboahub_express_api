/**
 * @swagger
 * components:
 *   schemas:
 *     CurrentUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f1c2a9e4b1a123456789ab
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         name:
 *           type: string
 *           example: John Doe
 *         phoneNumber:
 *           type: string
 *           example: "+237612345678"
 *         status:
 *           type: string
 *           example: ACTIVE
 *         city:
 *           type: string
 *           example: Douala
 *         country:
 *           type: string
 *           example: Cameroon
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get currently authenticated user
 *     tags: [User]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUserResponse'
 *       401:
 *         description: Unauthorized (missing or invalid auth cookie)
 */
