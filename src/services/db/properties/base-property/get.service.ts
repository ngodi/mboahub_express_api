import { PropertyModel } from '../../../../interfaces/property.interface';
import { Property } from '../../../../models/properties';
import { NotFoundError } from '../../../../errors/custom-error';
import { User } from '../../../../models/users';

export class GetById {
  constructor(private readonly id: string) {}

  async execute(): Promise<PropertyModel> {
    const property = await Property.findOne({
      where: { id: this.id },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'email', 'name'] },
      ],
    });
    if (!property) {
      throw new NotFoundError('Property not found');
    }

    return property.toJSON() as PropertyModel;
  }
}
