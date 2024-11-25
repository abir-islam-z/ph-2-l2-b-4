/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';
import orderValidationSchema from './order.validation';

const orderCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData: IOrder = req.body;

    const validatedDataResult =
      await orderValidationSchema.safeParseAsync(orderData);

    if (!validatedDataResult.success) throw validatedDataResult.error;

    const order = await OrderService.createOrderIntoDB(
      validatedDataResult.data,
    );
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    next(error);
  }
};

const calculateRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const revenue = await OrderService.calculateRevenueFromOrders();
    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue,
    });
  } catch (error: any) {
    next(error);
  }
};

export const OrderController = {
  calculateRevenue,
  orderCar,
};
