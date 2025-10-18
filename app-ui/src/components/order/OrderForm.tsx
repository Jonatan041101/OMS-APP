import { ICreateOrderDto } from '@oms/common-types';
import { FormikHelpers, useFormik } from 'formik';
import { useMemo } from 'react';

import Button from '../ui/Button/Button';
import InputField from '../ui/Form/InputField';
import { SelectField } from '../ui/Form/SelectField';

import { STATUS } from '@/constants/order/order-status.constant';
import { orderValidationSchema } from '@/constants/schemas/order/order-validation.schema';

interface IOrderFormProps {
	onClose(): void;
	onSubmit(values: ICreateOrderDto, formikHelpers: FormikHelpers<ICreateOrderDto>): Promise<void>;
	initialValues?: ICreateOrderDto;
	className?:string
}

export default function OrderForm({ onClose, onSubmit, initialValues ,className}: IOrderFormProps) {
	const formik = useFormik<ICreateOrderDto>({
		initialValues: initialValues ?? {
			customerName: '',
			item: '',
			quantity: '',
			status: 'pending',
		},
		validationSchema: orderValidationSchema,
		onSubmit,
	});
	const isCreateForm = useMemo(() => !initialValues, [initialValues]);
	const submitButtonText = isCreateForm
		? formik.isSubmitting
			? 'Creating...'
			: 'Create Order'
		: formik.isSubmitting
		? 'Updating...'
		: 'Update Order';
	return (
		<form
			className={`flex flex-col w-full justify-start items-center min-h-screen z-[100] bg-background-light dark:bg-background-dark ${className}`}
			onSubmit={formik.handleSubmit}
			data-test="order-form"
		>
			<div className='w-full max-w-[450px] flex flex-col'>
			<div className="flex items-center justify-between p-2 border-b border-background-light dark:border-background-dark/20 bg-background-light dark:bg-background-dark">
				<button
					className="flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-300"
					onClick={onClose}
					type="button"
					data-test="order-form-close"
				>
					<span className="material-symbols-outlined">close</span>
				</button>
				<h1
					data-test="order-form-title"
					className="flex-1 text-lg font-bold text-center text-gray-900 dark:text-white"
				>
					{isCreateForm ? 'New Order' : 'Update Order'}
				</h1>
				<div className="w-10" />
			</div>
			<div className="flex-1 p-4 space-y-6">
				<InputField
					dataTest="order-form-client-name"
					value={formik.values.customerName}
					error={formik.errors.customerName}
					touched={formik.touched.customerName}
					label="Client Name"
					name="customerName"
					placeholder="Write the client's name."
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>
				<InputField
					dataTest="order-form-item"
					value={formik.values.item}
					error={formik.errors.item}
					touched={formik.touched.item}
					label="Item"
					name="item"
					placeholder="Write the article."
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>

				<SelectField
					dataTest="order-form-status"
					label="Status"
					name="status"
					options={STATUS}
					value={formik.values.status}
					touched={formik.touched.status}
					error={formik.errors.status}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>

				<InputField
					dataTest="order-form-quantity"
					value={formik.values.quantity}
					error={formik.errors.quantity}
					touched={formik.touched.quantity}
					label="Quantity"
					name="quantity"
					placeholder="Write the quantity."
					type="number"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>
			</div>
			<div className="p-2 flex justify-center items-center border-t border-background-light dark:border-background-dark/20 bg-background-light dark:bg-background-dark">
				<Button
					text={submitButtonText}
					type="submit"
					isDisabled={formik.isSubmitting}
					dataTest="order-form-button-submit"
				/>
				{/* <button
					disabled={g}
					className="w-full h-12 px-5 text-base font-bold text-white rounded-lg bg-primary disabled:opacity-20"
					type="submit"
					data-test=""
				>
					{submitButtonText}
				</button> */}
			</div>
			</div>
		</form>
	);
}
