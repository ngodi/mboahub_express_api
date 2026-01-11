import {
  PropertyCreationAttributes,
  PropertyModel,
} from '../../../../interfaces/property.interface';
import { Property } from '../../../../models/properties';

export class CreateProperty {
  constructor(
    private readonly payload: PropertyCreationAttributes,
    private readonly userId: string
  ) {}

  async execute(): Promise<PropertyModel> {
    const property = await Property.create({
      ...this.payload,
      userId: this.userId,
    });

    return property.toJSON() as PropertyModel;
  }
}
