import { IOrder, Status } from '@oms/common-types';
import { Base } from '../../../common/base/domain/base.domain';

export class Order extends Base implements IOrder {
  customerName: string;
  item: string;
  quantity: number;
  status: Status;
}
