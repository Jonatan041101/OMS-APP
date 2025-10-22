import * as Yup from 'yup';

export const orderValidationSchema = Yup.object({
	customerName: Yup.string()
		.required('Customer Name is required')
		.min(2, 'Must be at least 2 characters'),
	item: Yup.string().required('Item is required'),
	quantity: Yup.number()
		.required('Quantity is required')
		.positive('Quantity must be positive')
		.integer('Quantity must be an integer'),
	status: Yup.string()
		.oneOf(['pending', 'completed', 'cancelled'], 'Invalid status')
		.required('Status is required'),
});
