import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

// global error handler
app.use((err: any, req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Something Went Wrong!',
    error: err.message,
  });
});

// 404 route
app.all('*', async (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Resource Not Found',
  });
});

export default app;
