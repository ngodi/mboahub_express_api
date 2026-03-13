import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { propertyController } from '../controllers/property.controller';
import {
  createPropertyValidator,
  updatePropertyValidator,
} from '../validators/property.validators';
import { validateRequest } from '../validators/validateRequests';

export const propertyRouter = Router();

// Create a new property
propertyRouter.post(
  '/',
  isAuthenticated,
  createPropertyValidator,
  validateRequest,
  propertyController.create
);

// Update an existing property
propertyRouter.put(
  '/:id',
  isAuthenticated,
  updatePropertyValidator,
  validateRequest,
  propertyController.update
);

// Get all properties for the authenticated user
propertyRouter.get('/user', isAuthenticated, propertyController.getAllByUser);

// Get property by ID
propertyRouter.get('/:id', isAuthenticated, propertyController.getById);

// Get all properties
propertyRouter.get('/', isAuthenticated, propertyController.getAll);

// Delete a property
propertyRouter.delete('/:id', isAuthenticated, propertyController.delete);
