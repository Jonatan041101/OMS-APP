import { IOrder, IUpdateOrderDto } from '@oms/common-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';
import { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';

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
		onMutate: ({ orderId, upddateOrderDto }) => {

			queryClient.cancelQueries({ queryKey: ['order', orderId] });
			const previousOrder:ISingleResponse<IOrder>|undefined = queryClient.getQueryData(['order', orderId]);
			queryClient.setQueryData(['order', orderId], (old:ISingleResponse<IOrder>) => {
				if(old?.data){
					return {
						...old,
						data:{
							...old.data,
							...upddateOrderDto,
						}
					};
				}
			});
			return { previousOrder };
		},
		onError: (_error, { orderId }, context) => {
			if (context?.previousOrder) {
				queryClient.setQueryData(['order', orderId], () => {
					return {
						...context.previousOrder,
					};
				});
			}
		},
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['order', orderId] });
		},
	});
}
