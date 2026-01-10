import { Request } from 'express';

// Filters query options and set the values for the database query.
export const prepareQueryOptions = (req: Request) => {
  const queryOptions = {
    sortBy: req.query.sortBy
      ? (req.query.sortBy as string).split(',').map((field) => field.trim())
      : ['created_at'],

    page: Number((req.query.page ?? 1).toString().trim()),

    sortOrder: req.query.sortOrder
      ? (req.query.sortOrder as string)
          .split(',')
          .map((field) => field.trim().toUpperCase() as 'ASC' | 'DESC')
      : ['DESC'],

    limit: req.query.perPage
      ? parseInt((req.query.perPage as string).trim(), 10)
      : 25,

    filters: req.query.filters,
  };

  return queryOptions;
};
