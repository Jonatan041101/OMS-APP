import { Status } from '../enums/status.enum';
import { IBaseEntity } from './base.entity.interface';

export interface IOrder extends IBaseEntity {
  customerName: string;
  status: Status;
  item: string;
  quantity: number;
}