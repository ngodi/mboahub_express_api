import {
  PropertyCreationAttributes,
  PropertyModel,
} from '../../../../interfaces/property.interface';
import { GetById } from './get.service';

export class Update {
  constructor(
    private readonly id: string,
    private readonly payload: PropertyCreationAttributes
  ) {}

  async execute(): Promise<PropertyModel> {
    const property = await new GetById(this.id).execute();
    await property.update(this.payload);

    return property.toJSON() as PropertyModel;
  }
}
