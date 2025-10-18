import { IUpdateOrderDto } from '@oms/common-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';

export default function useUpdateOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			upddateOrderDto,
			orderId,
		}: {
			upddateOrderDto: IUpdateOrderDto;
			orderId: string;
		}) => orderService.updateOrder(upddateOrderDto, orderId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
}
