import { useQuery } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';

export default function useGetOneOrder(orderId?: string) {
	return useQuery({
		queryKey: ['order', orderId],
		queryFn: () => orderService.getOneById(orderId),
		enabled: !!orderId,
	});
}
