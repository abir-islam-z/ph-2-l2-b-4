import { model, Schema } from 'mongoose';
import { ICar, ICarModel } from './car.interface';

const CarSchema = new Schema<ICar, ICarModel>(
  {
    brand: { type: String, required: true, trim: true, minlength: 3 },
    model: {
      type: String,
      trim: true,
      required: [true, 'Car Model is required'],
      minlength: [3, 'Car Model must be at least 3 characters long'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year cannot be less than 1900'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price should be a positive number'],
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
        message: 'Description should be at least 10 characters long',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

CarSchema.statics.isExist = async function (id: string) {
  return this.findById(id);
};

/* CarSchema.pre('find', function (next) {
  this.find({ inStock: true, quantity: { $gt: 0 } });
  next();
});

CarSchema.pre('findOne', function (next) {
  this.findOne({ inStock: true, quantity: { $gt: 0 } });
  next();
});

CarSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { inStock: true, quantity: { $gt: 0 } } });
  next();
}); */

export const CarModel = model<ICar, ICarModel>('Car', CarSchema);
