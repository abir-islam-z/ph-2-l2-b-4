/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ICar } from './car.interface';
import { CarService } from './car.service';
import carValidationSchema from './car.validation';
import handleZodError from '../../errors/handleZodError';

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carData: ICar = req.body;
    const result = await carValidationSchema.safeParseAsync(carData);

    if (!result?.success) throw handleZodError(result.error);

    const car = await CarService.createCarIntoDB(result.data);
    res
      .status(201)
      .json({ message: 'Car created successfully', success: true, data: car });
  } catch (error: any) {
    next(error);
  }
};

const getCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    const cars = await CarService.getAllCarsFromDB(searchTerm);
    res.json({
      message: 'Cars retrieved successfully',
      status: true,
      data: cars,
    });
  } catch (error: any) {
    next(error);
  }
};

const getCarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId: string = req.params.carId;
    const car = await CarService.getCarByIdFromDB(carId);

    res.json({
      message: 'Car retrieved successfully',
      status: true,
      data: car,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId: string = req.params.carId;
    const carData: Partial<ICar> = req.body;

    const validatedCarIdResult = await z.string().safeParseAsync(carId);
    const validatedCarDataResult = await carValidationSchema
      .partial()
      .safeParseAsync(carData);

    if (!validatedCarIdResult.success) throw validatedCarIdResult.error;
    if (!validatedCarDataResult.success) throw validatedCarDataResult.error;

    const car = await CarService.updateCarByIdInDB(
      validatedCarIdResult.data,
      validatedCarDataResult.data,
    );

    res.json({ message: 'Car updated successfully', status: true, data: car });
  } catch (error: any) {
    next(error);
  }
};

const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carId: string = req.params.carId;
    const validatedCarIdResult = await z.string().safeParseAsync(carId);
    if (!validatedCarIdResult.success) throw validatedCarIdResult.error;
    await CarService.deleteCarByIdFromDB(validatedCarIdResult.data);
    res.json({ message: 'Car deleted successfully', status: true, data: {} });
  } catch (error: any) {
    next(error);
  }
};

export const CarController = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
