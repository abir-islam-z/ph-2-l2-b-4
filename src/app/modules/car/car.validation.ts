import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z.string().trim().min(1, { message: 'Brand is required' }),
  model: z
    .string()
    .trim()
    .min(3, { message: 'Model must be at least 3 characters long' }),
  year: z
    .number()
    .int()
    .gte(1900, { message: 'Year must be at least 1900' })
    .lte(new Date().getFullYear(), {
      message: 'Year must be less than or equal to the current year',
    }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    message: 'Invalid category',
  }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean().optional().default(true),
});

export default carValidationSchema;
