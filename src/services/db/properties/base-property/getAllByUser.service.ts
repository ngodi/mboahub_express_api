import { PropertyModel } from '../../../../interfaces/property.interface';
import { Property } from '../../../../models/properties';
import { Request } from 'express';
import { prepareQueryParams } from '../../../../utils/prepareQueryParams';
import { fetchRecords } from '../../../../utils/fetchRecords';
import { User } from '../../../../models/users';

export class GetAllByUser {
  constructor(
    private readonly userId: string,
    private readonly req: Request
  ) {}

  async execute(): Promise<PropertyModel[] | any> {
    let queryParams = prepareQueryParams(this.req);
    queryParams.filters = Object.assign({}, queryParams.filters, {
      user_id: this.userId,
    });
    const includes = [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ];
    const { resources: properties, meta } = await fetchRecords(
      Property,
      includes,
      queryParams
    );

    return { properties, meta };
  }
}
