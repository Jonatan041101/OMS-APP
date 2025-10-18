import { Status } from '@oms/common-types';

export interface ICreateOrderDto {
  customerName: string;
  item: string;
  quantity: number;
  status: Status;
}
