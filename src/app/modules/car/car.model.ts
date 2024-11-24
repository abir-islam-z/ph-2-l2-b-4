import { model, Schema } from 'mongoose';
import { ICar } from './car.interface';

const CarSchema = new Schema<ICar>(
  {
    brand: { type: String, required: true, trim: true, minlength: 3 },
    model: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: '{VALUE} is not a valid Car category',
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => v.length > 10,
        message: 'Description must be at least 10 characters long',
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const CarModel = model<ICar>('Car', CarSchema);
