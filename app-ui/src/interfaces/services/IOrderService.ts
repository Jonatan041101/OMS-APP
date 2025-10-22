import { ICreateOrderDto, IGetAllOptionsQuery, IOrder, IUpdateOrderDto } from '@oms/common-types';

import { IListResponse, ISingleResponse } from '../api/IApiBaseResponse';

export interface IOrderService {
	getAll(options: IGetAllOptionsQuery<IOrder>): Promise<IListResponse<IOrder>>;
	saveOrder(createOrderDto: ICreateOrderDto): Promise<ISingleResponse<IOrder>>;
	updateOrder(updateOrderDto: IUpdateOrderDto, id: string): Promise<ISingleResponse<IOrder>>;
	deleteOrder(id: string): Promise<void>;
}
