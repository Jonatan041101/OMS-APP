import * as Yup from 'yup';
import { createOrderSchema } from './create-order.schema.validation';

export const updateOrderSchema = createOrderSchema.shape({
  customerName: Yup.string()
    .trim()
    .min(3, 'customerName must be at least 3 characters')
    .max(100, 'customerName must be at most 100 characters')
    .optional(),

  status: Yup.string().trim().optional(),

  item: Yup.string().optional(),

  quantity: Yup.number().typeError('quantity must be a number').optional(),
});
