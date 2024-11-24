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

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is Healthy',
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
