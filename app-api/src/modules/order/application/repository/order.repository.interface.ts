import { IGetAllOptionsQuery, IOrder } from '@oms/common-types';
import { ICreateOrderDto } from '../dto/create-order.dto.interface';
import { IUpdateOrderDto } from '../dto/update-order.dto.interface';
import { ICollection } from '../../../../common/base/application/dto/collection.dto.interface';

export interface IOrderRepository {
  saveOne(createOrderDto: ICreateOrderDto): Promise<IOrder>;
  updateOneOrFail(id: string, updateOrderDto: IUpdateOrderDto): Promise<IOrder>;
  getOneByIdOrFail(id: string): Promise<IOrder>;
  getAll(options: IGetAllOptionsQuery<IOrder>): Promise<ICollection<IOrder>>;
  deleteOneOrFail(id: string): Promise<void>;
}
