import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { BadRequestError } from '../errors/custom-error';

export const fetchRecords = async (
  resource: any,
  includes: any,
  options: {
    sortBy?: string[];
    page?: number;
    sortOrder?: string[];
    limit: number;
    filters?: Record<string, string | number> | {};
  }
): Promise<any> => {
  try {
    let page = Number(options.page) <= 0 ? 1 : Number(options.page);
    let limit = Number(options.limit) <= 0 ? 0 : Number(options.limit);

    const offset = (page - 1) * limit! || 0;

    // Prepare Sort fields
    const orderDirection = options.sortBy?.map((field, i) => [
      field,
      options.sortOrder?.[i] || 'DESC',
    ]);
    // Get all table fields.
    const validFields = Object.keys(resource.rawAttributes);

    // Query users with filter
    const { rows: resources, count: totalCount } =
      await resource.findAndCountAll({
        include: includes,
        attributes: validFields,
        where: buildFilter(resource, options.filters, validFields),
        order: orderDirection,
        limit: limit,
        offset,
      });

    const meta = {
      total: totalCount,
      page: page,
      perPage: limit,
      skipped: (Number(page) - 1) * limit,
      pageCount: Math.ceil(totalCount / limit),
    };
    return { resources, meta };
  } catch (error) {
    console.log(error);
    throw new BadRequestError('Error fetching records');
  }
};

const buildFilter = (
  resource: any,
  queryfilters: any,
  fields?: string[]
): WhereOptions => {
  const where: WhereOptions = {};
  const modelAttributes = resource.getAttributes();

  // Use all model fields if none are provided
  const allowedFilters = fields ?? Object.keys(modelAttributes);

  if (queryfilters) {
    allowedFilters.forEach((field) => {
      const value = queryfilters[field];

      // Skip if value is undefined or field doesn't exist in model
      if (value === undefined || !modelAttributes[field]) return;

      const attrType = modelAttributes[field].type;
      const fieldType = attrType?.constructor?.name;
      if (['STRING', 'TEXT', 'CHAR'].includes(fieldType)) {
        where[field] = { [Op.iLike]: `%${value}%` };
      } else {
        where[field] = value;
      }
    });
  }

  return where;
};
