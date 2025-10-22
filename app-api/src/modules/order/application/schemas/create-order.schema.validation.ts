import * as Yup from 'yup';

export const createOrderSchema = Yup.object({
  customerName: Yup.string()
    .trim()
    .min(3, 'customerName must be at least 3 characters')
    .max(100, 'customerName must be at most 100 characters')
    .required('customerName is required'),

  status: Yup.string().trim().required('status is required'),

  item: Yup.string().required('item is required'),

  quantity: Yup.number().typeError('quantity must be a number').required('quantity is required'),
});
