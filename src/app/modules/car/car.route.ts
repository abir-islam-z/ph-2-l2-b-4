import express from 'express';
import { CarController } from './car.controller';

const router = express.Router();

router.post('/', CarController.createCar);
router.get('/', CarController.getCars);
router.get('/:carId', CarController.getCarById);
router.put('/:carId', CarController.updateCar);
router.delete('/:carId', CarController.deleteCar);

export const CarRoutes = router;
