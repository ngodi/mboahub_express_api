import { body } from 'express-validator';
import {
  PropertyType,
  PropertyCategory,
  PropertyStatus,
} from '../types/property.types';

export const createPropertyValidator = [
  // ──────────────────────
  // Required core fields
  // ──────────────────────
  body('listingName')
    .notEmpty()
    .withMessage('Listing name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Listing name must be between 3 and 50 characters')
    .trim(),

  body('propertyType')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(Object.values(PropertyType))
    .withMessage(
      `Property type must be one of ${Object.values(PropertyType).join(', ')}`
    ),

  body('propertyCategory')
    .notEmpty()
    .withMessage('Property category is required')
    .isIn(Object.values(PropertyCategory))
    .withMessage(
      `Property category must be one of ${Object.values(PropertyCategory).join(', ')}`
    ),

  body('propertyStatus')
    .notEmpty()
    .withMessage('Property status is required')
    .isIn(Object.values(PropertyStatus))
    .withMessage(
      `Property status must be one of ${Object.values(PropertyStatus).join(', ')}`
    ),

  body('street')
    .notEmpty()
    .withMessage('Street is required')
    .isLength({ max: 50 })
    .withMessage('Street must not exceed 50 characters')
    .trim(),

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

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  // ──────────────────────
  // Optional location
  // ──────────────────────
  // body('lat')
  //   .optional()
  //   .isFloat({ min: -90, max: 90 })
  //   .withMessage('Latitude must be between -90 and 90'),

  // body('lng')
  //   .optional()
  //   .isFloat({ min: -180, max: 180 })
  //   .withMessage('Longitude must be between -180 and 180'),

  // ──────────────────────
  // Optional details
  // ──────────────────────
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 5000 })
    .withMessage('Description is too long'),

  body('parlours')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Parlours must be a non-negative integer'),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a non-negative integer'),

  body('toilets')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Toilets must be a non-negative integer'),

  body('kitchens')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Kitchens must be a non-negative integer'),

  body('areaSize')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area size must be a positive number'),

  body('fenced').optional().isBoolean().withMessage('Fenced must be a boolean'),

  body('garage').optional().isBoolean().withMessage('Garage must be a boolean'),

  // ──────────────────────
  // Images
  // ──────────────────────
  body('images')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Images must be an array (max 20 items)'),

  body('images.*')
    .optional()
    .isString()
    .withMessage('Each image must be a string URL'),
];

export const updatePropertyValidator = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Title must be between 3 and 50 characters')
    .trim(),

  body('propertyType')
    .optional()
    .isIn(Object.values(PropertyType))
    .withMessage(
      `Property type must be one of ${Object.values(PropertyType).join(', ')}`
    ),

  body('propertyCategory')
    .optional()
    .isIn(Object.values(PropertyCategory))
    .withMessage(
      `Property category must be one of ${Object.values(PropertyCategory).join(', ')}`
    ),

  body('propertyStatus')
    .optional()
    .isIn(Object.values(PropertyStatus))
    .withMessage(
      `Property status must be one of ${Object.values(PropertyStatus).join(', ')}`
    ),

  body('street')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Street must not exceed 50 characters')
    .trim(),

  body('city')
    .optional()
    .isLength({ max: 25 })
    .withMessage('City must not exceed 25 characters')
    .trim(),

  body('country')
    .optional()
    .isLength({ max: 25 })
    .withMessage('Country must not exceed 25 characters')
    .trim(),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 5000 })
    .withMessage('Description is too long'),

  body('parlours')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Parlours must be a non-negative integer'),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a non-negative integer'),

  body('toilets')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Toilets must be a non-negative integer'),

  body('kitchens')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Kitchens must be a non-negative integer'),

  body('areaSize')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area size must be a positive number'),

  body('fenced').optional().isBoolean().withMessage('Fenced must be a boolean'),

  body('garage').optional().isBoolean().withMessage('Garage must be a boolean'),

  body('images')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Images must be an array (max 20 items)'),

  body('images.*')
    .optional()
    .isString()
    .withMessage('Each image must be a string URL'),
];
