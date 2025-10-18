import { ICreateOrderDto, IGetAllOptionsQuery, IOrder, IUpdateOrderDto } from '@oms/common-types';

import { ApiRequestConfig, apiService } from './api.service';

import { IListResponse, ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { IApiService } from '@/interfaces/services/IApiService';
import { IOrderService } from '@/interfaces/services/IOrderService';

class OrderService implements IOrderService {
	api: IApiService<ApiRequestConfig>;
	constructor(api: IApiService<ApiRequestConfig>) {
		this.api = api;
	}

	async getAll(options: IGetAllOptionsQuery<IOrder>): Promise<IListResponse<IOrder>> {
		const filter: Record<string, string> = {};
		// options.filter?.status
		if (options.filter?.status) {
			filter['filter[status]'] = options.filter?.status;
		}

		const params = new URLSearchParams({
			'page[number]': String(options.page?.number),
			'page[size]': String(options.page?.size),
			...filter,
		});
		return await this.api.get<IListResponse<IOrder>>(`/order?${params}`);
	}

	async saveOrder(createOrderDto: ICreateOrderDto): Promise<ISingleResponse<IOrder>> {
		return await this.api.post<ISingleResponse<IOrder>>('/order', createOrderDto);
	}
	async getOneById(orderId?: string): Promise<ISingleResponse<IOrder>> {
		return await this.api.get<ISingleResponse<IOrder>>(`/order/${orderId}`);
	}
	async updateOrder(
		updateOrderDto: IUpdateOrderDto,
		orderId: string,
	): Promise<ISingleResponse<IOrder>> {
		return await this.api.patch<ISingleResponse<IOrder>>(`/order/${orderId}`, updateOrderDto);
	}

	async deleteOrder(orderId: string): Promise<void> {
		return await this.api.delete(`/order/${orderId}`);
	}
}

export const orderService = new OrderService(apiService);
