import { useMutation, useQueryClient } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';

export default function useDeleteOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (orderId: string) => orderService.deleteOrder(orderId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
}
