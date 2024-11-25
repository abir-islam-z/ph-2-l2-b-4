/* 
brand (string): The brand or manufacturer of the car (e.g., Toyota, BMW, Ford).
model (string): The model of the car (e.g., Camry, 3 Series, Focus).
year (number): The year of manufacture.
price (number): Price of the car.
category (string): The type of car (e.g., Sedan, SUV, Truck). use enum, exact value (Sedan, SUV, Truck, Coupe, Convertible)
description (string): A brief description of the car's features.
quantity (number): Quantity of the car available.
inStock (boolean): Indicates if the car is in stock.
*/

import { Model } from 'mongoose';

export interface ICar {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICarModel extends Model<ICar> {
  // eslint-disable-next-line no-unused-vars
  isExist: (id: string) => Promise<ICar | null>;
}
