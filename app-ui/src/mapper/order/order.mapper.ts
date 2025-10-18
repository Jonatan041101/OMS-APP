import { IUpdateOrderDto } from '@oms/common-types';

import { AppMapper, appMapper } from '../app.mapper';

export class OrderMapper {
	constructor(private readonly appMapper: AppMapper) {}
	fromUpdateOrderDtoToUpdateOrderRequest(
		oldUpdateOrderDto: IUpdateOrderDto,
		newUpdateOrderDto: IUpdateOrderDto,
	) {
		return this.mapChanges(oldUpdateOrderDto, newUpdateOrderDto);
	}
	mapChanges(oldValues: IUpdateOrderDto, newValues: IUpdateOrderDto): IUpdateOrderDto {
		const mapped = {
			customerName: this.appMapper.compareValue(oldValues.customerName, newValues.customerName),
			item: this.appMapper.compareValue(oldValues.item, newValues.item),
			quantity: this.appMapper.compareValue(oldValues.quantity, newValues.quantity),
			status: this.appMapper.compareValue(oldValues.status, newValues.status),
		};
		return this.appMapper.cleanUndefineds(mapped);
	}
}

export const orderMapper = new OrderMapper(appMapper);
