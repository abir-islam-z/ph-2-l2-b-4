/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { z } from 'zod';
import { ICar } from './car.interface';
import { CarService } from './car.service';
import carValidationSchema from './car.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData: ICar = req.body;
    const validatedData = await carValidationSchema.parseAsync(carData);
    const car = await CarService.createCarIntoDB(validatedData);
    res
      .status(201)
      .json({ message: 'Car created successfully', success: true, data: car });
  } catch (error: any) {
    res.status(500).json({
      message: 'Car creation failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getCars = async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    const cars = await CarService.getAllCarsFromDB(searchTerm);
    res.json({
      message: 'Cars retrieved successfully',
      status: true,
      data: cars,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Cars retrieval failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const carId: string = req.params.carId;
    const car = await CarService.getCarByIdFromDB(carId);

    res.json({
      message: 'Car retrieved successfully',
      status: true,
      data: car,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Car retrieval failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const carId: string = req.params.carId;
    const carData: Partial<ICar> = req.body;

    const validatedData = await carValidationSchema
      .partial()
      .parseAsync(carData);
    const validatedCarId = await z.string().parseAsync(carId);

    const car = await CarService.updateCarByIdInDB(
      validatedCarId,
      validatedData,
    );

    res.json({ message: 'Car updated successfully', status: true, data: car });
  } catch (error: any) {
    res.status(500).json({
      message: 'Car update failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId: string = req.params.carId;
    await CarService.deleteCarByIdFromDB(carId);
    res.json({ message: 'Car deleted successfully', status: true, data: {} });
  } catch (error: any) {
    res.status(500).json({
      message: 'Car deletion failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const CarController = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
