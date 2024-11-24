import { Types } from 'mongoose';

export interface IOrder {
  email: string;
  car: Types.ObjectId | string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
