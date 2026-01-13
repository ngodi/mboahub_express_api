import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { standardMiddlewares } from './middleware/standardMiddleware';
import { appRoutes } from './appRoutes';
import { startServer } from './server';
import { errorhandler } from './errors/errorHandler';
import { swaggerSpec } from './config/swagger';

export const app: Express = express();

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
standardMiddlewares(app);
appRoutes(app);
startServer(app);
errorhandler(app);
