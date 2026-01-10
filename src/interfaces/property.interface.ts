import { Model, Optional } from 'sequelize';
import {
  PropertyCategory,
  PropertyStatus,
  PropertyType,
} from '../types/property.types';

export interface PropertyInterface {
  id?: string;
  title: string;
  propertyType: PropertyType;
  propertyCategory: PropertyCategory;
  propertyStatus: PropertyStatus;
  street: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  price: number;
  description?: string;
  parlours?: number;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  kitchens?: number;
  areaSize?: number;
  fenced?: boolean;
  garage?: boolean;
  images?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface PropertyCreationAttributes extends Optional<
  PropertyInterface,
  'id' | 'created_at' | 'updated_at'
> {}

export interface PropertyModel
  extends
    Model<PropertyInterface, PropertyCreationAttributes>,
    PropertyInterface {}
