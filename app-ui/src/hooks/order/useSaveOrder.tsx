import { ICreateOrderDto } from '@oms/common-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';

export default function useSaveOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (createOrderDto: ICreateOrderDto) => orderService.saveOrder(createOrderDto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
}
