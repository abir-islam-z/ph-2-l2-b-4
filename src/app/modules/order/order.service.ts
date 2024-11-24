import { CarModel } from '../car/car.model';
import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const car = await CarModel.findById(orderData.car);

  if (!car) {
    throw new Error('Car not found');
  }

  if (car.quantity === 0 || car.quantity < orderData.quantity) {
    throw new Error('Not enough quantity');
  }

  if (orderData.quantity < 1) {
    throw new Error('Quantity must be a positive number');
  }

  car.quantity =
    car.quantity > 0 ? car.quantity - orderData.quantity : car.quantity;
  car.inStock = car.quantity > 0;

  await car.save();

  const order = await OrderModel.create(orderData);
  return order;
};

const calculateRevenueFromOrders = async () => {
  const result = await OrderModel.aggregate([
    // stage 1
    {
      $group: { _id: '$totalPrice', totalRevenue: { $sum: '$totalPrice' } },
    },

    // stage 2
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);

  return result[0];
};

export const OrderService = {
  createOrderIntoDB,
  calculateRevenueFromOrders,
};
