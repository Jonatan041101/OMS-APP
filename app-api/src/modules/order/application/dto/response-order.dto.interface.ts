import { IPagingCollectionData } from '@oms/common-types';

export class ResponseOrderDto {
  id?: string;
  customerName: string;
  quantity: number;
  status: string;
  item: string;
  createdAt?: string;
  updatedAt?: string;
}

export class ResponseOrderManyDto {
  data: ResponseOrderDto[];
  meta: IPagingCollectionData;
}
