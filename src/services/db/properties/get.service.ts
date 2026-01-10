import { PropertyModel } from '../../../interfaces/property.interface';
import { Property } from '../../../models/properties';
import { NotFoundError } from '../../../errors/custom-error';

export class GetPropertyById {
  constructor(private readonly id: string) {}

  async execute(): Promise<PropertyModel> {
    const property = await Property.findByPk(this.id);
    if (!property) {
      throw new NotFoundError('Property not found');
    }

    return property.toJSON() as PropertyModel;
  }
}
