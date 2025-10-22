import { ICreateOrderDto } from '@oms/common-types';
import { FormikHelpers } from 'formik';

import OrderForm from './OrderForm';

import { ORDER_ERROR_MESSAGES } from '@/constants/messages/order/order-error-messages.constant';
import { ORDER_SUCCESS_MESSAGES } from '@/constants/messages/order/order-succes-message.constant';
import { ApiResponseError } from '@/errors/ApiResponseError';
import useSaveOrder from '@/hooks/order/useSaveOrder';
import { notificationService } from '@/services/notification.service';

interface IOrderCreateFormProps {
	onClose: () => void;
}

export default function OrderCreateForm({ onClose }: IOrderCreateFormProps) {
	const { mutateAsync } = useSaveOrder();

	const onSubmit = async (
		values: ICreateOrderDto,
		formikHelpers: FormikHelpers<ICreateOrderDto>,
	) => {
		try {
			await mutateAsync(values);
			formikHelpers.resetForm();
			onClose();
			notificationService.success(ORDER_SUCCESS_MESSAGES.CREATION_SUCCESS);
		} catch (error) {
			if (error instanceof ApiResponseError) {
				notificationService.error(error.message);
			} else {
				notificationService.error(ORDER_ERROR_MESSAGES.CREATION_FAILED); //cAMBIAR PORENUM
			}
		}
	};
	return <OrderForm onClose={onClose} onSubmit={onSubmit} />;
}
