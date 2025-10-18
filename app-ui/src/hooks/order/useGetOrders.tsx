import { IGetAllOptionsQuery, IOrder } from '@oms/common-types';
import { useQuery } from '@tanstack/react-query';

import { orderService } from '@/services/order.service';

export default function useGetOrders(options: IGetAllOptionsQuery<IOrder>) {
	return useQuery({
		queryKey: ['orders'],
		queryFn: () => orderService.getAll(options),
		enabled: true,
	});
}
