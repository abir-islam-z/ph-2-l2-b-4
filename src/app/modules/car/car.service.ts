import { ICar } from '../car/car.interface';
import { CarModel } from '../car/car.model';

const createCarIntoDB = async (carData: ICar) => {
  const result = await CarModel.create(carData);
  return result;
};

const getAllCarsFromDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        $or: [
          { brand: searchTerm ?? '' },
          { model: searchTerm ?? '' },
          { category: searchTerm ?? '' },
        ],
      }
    : {};
  const result = await CarModel.find(query);
  return result;
};

const getCarByIdFromDB = async (carId: string) => {
  const result = await CarModel.findById(carId);
  return result;
};

const updateCarByIdInDB = async (carId: string, carData: Partial<ICar>) => {
  const inStock = carData?.quantity && carData?.quantity > 0;
  const result = await CarModel.findByIdAndUpdate(
    carId,
    {
      ...carData,
      inStock,
    },
    {
      new: true,
    },
  );
  return result;
};

const deleteCarByIdFromDB = async (carId: string) => {
  await CarModel.findByIdAndUpdate(carId, { inStock: false, quantity: 0 });
};

export const CarService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
  updateCarByIdInDB,
  deleteCarByIdFromDB,
};
