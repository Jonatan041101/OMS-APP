import { IOrder } from '@oms/common-types';
import { FormEvent, useState } from 'react';

import DeleteConfirmationModal from '../ui/Modal/DeleteConfirmationModal.tsx/DeleteConfirmationModal';

import { ORDER_ERROR_MESSAGES } from '@/constants/messages/order/order-error-messages.constant';
import { ORDER_SUCCESS_MESSAGES } from '@/constants/messages/order/order-succes-message.constant';
import { ApiResponseError } from '@/errors/ApiResponseError';
import useDeleteOrder from '@/hooks/order/useDeleteOrder';
import { notificationService } from '@/services/notification.service';

interface IOrderDeleteForm {
	order: IOrder;
	onClose: () => void;
}

export default function OrderDeleteForm({ order, onClose }: IOrderDeleteForm) {
	const { mutateAsync } = useDeleteOrder();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setIsSubmitting(true);
		try {
			await mutateAsync(order.id);
			onClose();
			notificationService.success(ORDER_SUCCESS_MESSAGES.DELETION_SUCCESS);
		} catch (error) {
			if (error instanceof ApiResponseError) {
				notificationService.error(error.message);
			} else {
				notificationService.error(ORDER_ERROR_MESSAGES.DELETION_FAILED);
			}
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<DeleteConfirmationModal
			onClose={onClose}
			handleSubmit={handleSubmit}
			text={`Delete order with ID ${order.id}`}
			isSubmitting={isSubmitting}
		/>
	);
}
