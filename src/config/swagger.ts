// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mboahub API',
      version: '1.0.0',
      description: 'API documentation for the Mboahub API',
    },
    servers: [
      {
        url: process.env.AWS_EC2_HOST, // base URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../docs/api-docs/*.ts'),
    path.join(__dirname, '../routes/**/*.ts'),
  ],
});
