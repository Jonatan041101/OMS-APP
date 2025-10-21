import { ICreateOrderDto, IOrder } from '@oms/common-types';
import { FormikHelpers } from 'formik';

import OrderForm from './OrderForm';

import { ORDER_ERROR_MESSAGES } from '@/constants/messages/order/order-error-messages.constant';
import { ORDER_SUCCESS_MESSAGES } from '@/constants/messages/order/order-succes-message.constant';
import { ApiResponseError } from '@/errors/ApiResponseError';
import useUpdateOrder from '@/hooks/order/useUpdateOrder';
import { orderMapper } from '@/mapper/order/order.mapper';
import { notificationService } from '@/services/notification.service';

interface IOrderUpdateForm {
	onClose: () => void;
	order: IOrder;
}

export default function OrderUpdateForm({ onClose, order }: IOrderUpdateForm) {
	const { mutateAsync } = useUpdateOrder();

	const onSubmit = async (
		values: ICreateOrderDto,
		formikHelpers: FormikHelpers<ICreateOrderDto>,
	) => {
		try {
			const mappedOrder = orderMapper.fromUpdateOrderDtoToUpdateOrderRequest(order, values);
		console.log(mappedOrder,"mappedOrder")
			await mutateAsync({ upddateOrderDto: mappedOrder, orderId: order.id });
		console.log("Despues de el mutateAsync")
			formikHelpers.resetForm();
			onClose();
			notificationService.success(ORDER_SUCCESS_MESSAGES.UPDATE_SUCCESS);
		} catch (error) {
			console.log(error,"error")
			if (error instanceof ApiResponseError) {
				notificationService.error(error.message);
			} else {
				notificationService.error(ORDER_ERROR_MESSAGES.UPDATE_FAILED); //cAMBIAR PORENUM
			}
		}
	};
	return <OrderForm onClose={onClose} onSubmit={onSubmit} initialValues={order} className='fixed left-0 top-0'/>;
}
