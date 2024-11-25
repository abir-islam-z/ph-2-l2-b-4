import { Request, Response } from 'express';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';
import orderValidationSchema from './order.validation';

const orderCar = async (req: Request, res: Response) => {
  try {
    const orderData: IOrder = req.body;

    const validatedData = await orderValidationSchema.parseAsync(orderData);
    const order = await OrderService.createOrderIntoDB(validatedData);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Order creation failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderService.calculateRevenueFromOrders();
    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const OrderController = {
  calculateRevenue,
  orderCar,
};
