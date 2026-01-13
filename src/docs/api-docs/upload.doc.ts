/**
 * @swagger
 * components:
 *   securitySchemes:
 *     CookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *       description: HTTP-only auth cookie
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: uploads/17123456789-image.jpg
 *               url:
 *                 type: string
 *                 example: https://bucket.s3.amazonaws.com/uploads/17123456789-image.jpg
 *
 *     ImageDeleteRequest:
 *       type: object
 *       required:
 *         - keys
 *       properties:
 *         keys:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - uploads/17123456789-image.jpg
 *             - uploads/17123456789-image2.jpg
 */

/**
 * @swagger
 * /api/v1/upload/images:
 *   post:
 *     summary: Upload multiple images to S3
 *     tags: [Upload]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 maxItems: 10
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       400:
 *         description: Validation or upload error
 *       401:
 *         description: Unauthorized (missing or invalid cookie)
 */

/**
 * @swagger
 * /api/v1/upload/images:
 *   delete:
 *     summary: Delete images from S3
 *     tags: [Upload]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageDeleteRequest'
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       400:
 *         description: Delete error
 *       401:
 *         description: Unauthorized
 */
