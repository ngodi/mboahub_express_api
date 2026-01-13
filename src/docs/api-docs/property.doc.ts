/**
 * @swagger
 * components:
 *   securitySchemes:
 *     CookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *       description: HTTP-only authentication cookie
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyBase:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: Modern 3 Bedroom Apartment
 *         propertyType:
 *           type: string
 *           example: APARTMENT
 *         propertyCategory:
 *           type: string
 *           example: RENT
 *         propertyStatus:
 *           type: string
 *           example: AVAILABLE
 *         street:
 *           type: string
 *           maxLength: 50
 *           example: Main Street
 *         city:
 *           type: string
 *           maxLength: 25
 *           example: Douala
 *         country:
 *           type: string
 *           maxLength: 25
 *           example: Cameroon
 *         price:
 *           type: number
 *           format: float
 *           example: 250000
 *         lat:
 *           type: number
 *           format: float
 *           example: 4.0511
 *         lng:
 *           type: number
 *           format: float
 *           example: 9.7679
 *         description:
 *           type: string
 *           maxLength: 5000
 *           example: Spacious apartment with modern finishing
 *         parlours:
 *           type: integer
 *           minimum: 0
 *         bedrooms:
 *           type: integer
 *           minimum: 0
 *         bathrooms:
 *           type: integer
 *           minimum: 0
 *         toilets:
 *           type: integer
 *           minimum: 0
 *         kitchens:
 *           type: integer
 *           minimum: 0
 *         areaSize:
 *           type: number
 *           format: float
 *         fenced:
 *           type: boolean
 *         garage:
 *           type: boolean
 *         images:
 *           type: array
 *           maxItems: 20
 *           items:
 *             type: string
 *             example: https://bucket.s3.amazonaws.com/property/img1.jpg
 *
 *     CreatePropertyRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/PropertyBase'
 *       required:
 *         - title
 *         - propertyType
 *         - propertyCategory
 *         - propertyStatus
 *         - street
 *         - city
 *         - country
 *         - price
 *
 *     UpdatePropertyRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/PropertyBase'
 *
 *     PropertyResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/PropertyBase'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 64fa12c4e123456789abcd01
 *             userId:
 *               type: string
 *               example: 64fa12c4e123456789abcd99
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 */

/**
 * @swagger
 * /api/v1/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePropertyRequest'
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   put:
 *     summary: Update an existing property
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePropertyRequest'
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
/**
 * @swagger
 * /api/v1/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
/**
 * @swagger
 * /api/v1/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyResponse'
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/properties/user/me:
 *   get:
 *     summary: Get properties created by authenticated user
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyResponse'
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Property]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
