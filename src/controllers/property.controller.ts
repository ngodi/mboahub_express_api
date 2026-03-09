import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { propertyService } from '../services/db/properties/property.service';

class PropertyController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.currentUser;

    const property = await propertyService.create(req.body, user?.id!);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const property = await propertyService.getById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property retrieved successfully',
      data: property,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const property = await propertyService.update(req.params.id, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property updated successfully',
      data: property,
    });
  };

  getAllByUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser?.id!;
    const { properties, meta } = await propertyService.getAllByUser(
      userId,
      req
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: properties,
      meta,
    });
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { properties, meta } = await propertyService.getAll(req);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: properties,
      meta,
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await propertyService.destroy(req.params.id);

    res.status(StatusCodes.NO_CONTENT).send();
  };
}

export const propertyController = new PropertyController();
