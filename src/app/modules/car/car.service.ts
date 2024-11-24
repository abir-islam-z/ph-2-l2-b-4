import { ICar } from '../car/car.interface';
import { CarModel } from '../car/car.model';
// services

const createCarIntoDB = async (carData: ICar) => {
  const result = await CarModel.create(carData);
  return result;
};

const getAllCarsFromDB = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    result = await CarModel.find({
      $or: [
        { brand: searchTerm ?? '' },
        { model: searchTerm ?? '' },
        { category: searchTerm ?? '' },
      ],
    });
  } else {
    result = await CarModel.find();
  }
  return result;
};

const getCarByIdFromDB = async (carId: string) => {
  const result = await CarModel.findById(carId);
  return result;
};

const updateCarByIdInDB = async (carId: string, carData: ICar) => {
  const result = await CarModel.findByIdAndUpdate(carId, carData, {
    new: true,
  });
  return result;
};

const deleteCarByIdFromDB = async (carId: string) => {
  await CarModel.findByIdAndDelete(carId);
};

export const CarService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
  updateCarByIdInDB,
  deleteCarByIdFromDB,
};
