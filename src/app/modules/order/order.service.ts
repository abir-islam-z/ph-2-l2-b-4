import { CarModel } from '../car/car.model';
import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const car = await CarModel.findById(orderData.car);

  // error handling
  if (!car) throw new Error('Car not found');
  if (car.quantity < orderData.quantity) throw new Error('Not enough stock');

  car.quantity -= orderData.quantity; // decrement the quantity
  car.inStock = car.quantity > 0;
  await car.save();
  car.inStock = car.quantity > 0; // set inStock to false if car.quantity == 0
  await car.save();

  const newOrderData = {
    ...orderData,
    totalPrice: car.price * orderData.quantity,
  };

  const order = await OrderModel.create(newOrderData);
  return order;
};

const calculateRevenueFromOrders = async () => {
  const result = await OrderModel.aggregate([
    // stage 1
    {
      $group: { _id: '', totalRevenue: { $sum: '$totalPrice' } },
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
