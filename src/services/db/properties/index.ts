import {
  PropertyCreationAttributes,
  PropertyModel,
} from '../../../interfaces/property.interface';
import { CreateProperty } from './create.service';
import { GetPropertyById } from './get.service';

class PropertyService {
  async create(
    payload: PropertyCreationAttributes,
    userId: string
  ): Promise<PropertyModel> {
    return new CreateProperty(payload, userId).execute();
  }

  async getById(id: string): Promise<PropertyModel> {
    return new GetPropertyById(id).execute();
  }
}

export const propertyService = new PropertyService();
