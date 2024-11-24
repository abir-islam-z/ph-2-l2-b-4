import { model, Schema } from 'mongoose';
import { isEmail } from 'validator';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: '{VALUE} is not a valid email!',
      },
    },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value > 0,
        message: 'Total price must be a positive number!',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<IOrder>('Order', OrderSchema);
