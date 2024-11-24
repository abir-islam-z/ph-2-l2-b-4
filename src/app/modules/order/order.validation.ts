import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: '{VALUE} is not a valid email!' }),
  car: z.string({
    required_error: 'Car ID is required!',
  }),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number!' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default orderValidationSchema;
