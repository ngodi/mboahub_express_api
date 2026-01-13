import { Request } from 'express';
import {
  PropertyCreationAttributes,
  PropertyModel,
} from '../../../interfaces/property.interface';
import { CreateProperty } from './base-property/create.service';
import { GetById } from './base-property/get.service';
import { GetAllByUser } from './base-property/getAllByUser.service';
import { GetAll } from './base-property/getAll.service';
import { Update } from './base-property/update.service';
import { destroy } from './base-property/delete.service';

class PropertyService {
  async create(
    payload: PropertyCreationAttributes,
    userId: string
  ): Promise<PropertyModel> {
    return new CreateProperty(payload, userId).execute();
  }

  async getById(id: string): Promise<PropertyModel> {
    return new GetById(id).execute();
  }

  async update(
    id: string,
    payload: PropertyCreationAttributes
  ): Promise<PropertyModel> {
    return new Update(id, payload).execute();
  }

  async getAllByUser(
    userId: string,
    req: Request
  ): Promise<PropertyModel[] | any> {
    return new GetAllByUser(userId, req).execute();
  }

  async getAll(req: Request): Promise<PropertyModel[] | any> {
    return new GetAll(req).execute();
  }

  async destroy(id: string): Promise<void> {
    return new destroy(id).execute();
  }
}

export const propertyService = new PropertyService();
