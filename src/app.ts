import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger-output.json');
import { standardMiddlewares } from './middleware/standardMiddleware';
import { appRoutes } from './appRoutes';
import { startServer } from './server';
import { errorhandler } from './errors/errorHandler';

export const app: Express = express();

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs-json', (req, res) => {
  res.json(swaggerDocument);
});

standardMiddlewares(app);
appRoutes(app);
startServer(app);
errorhandler(app);
