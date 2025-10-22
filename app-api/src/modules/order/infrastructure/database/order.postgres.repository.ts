import { IGetAllOptionsQuery, IOrder } from '@oms/common-types';
import { ICreateOrderDto } from '../../application/dto/create-order.dto.interface';
import { IUpdateOrderDto } from '../../application/dto/update-order.dto.interface';
import { OrderMapper } from '../../application/mapper/order.mapper';
import { IOrderRepository } from '../../application/repository/order.repository.interface';
import { Order } from '../../domain/order.domain';
import { OrderNotFoundException } from './exception/order-not-found.exception';
import { OrderModel } from './order.model';
import { ICollection } from '../../../../common/base/application/dto/collection.dto.interface';

export class OrderPostgresRepository implements IOrderRepository {
  private orderMapper: OrderMapper;
  constructor(private readonly orderModel: typeof OrderModel) {
    this.orderMapper = new OrderMapper();
  }

  private async getOneModelByIdOrFail(id: string): Promise<OrderModel> {
    const order = await OrderModel.findByPk(id);
    if (!order) throw new OrderNotFoundException(id);
    return order;
  }

  async getAll(options: IGetAllOptionsQuery<Order>): Promise<ICollection<IOrder>> {
    const pageSize = options.page?.size ?? 5;
    const pageNumber = options.page?.number ?? 1;
    const offset = (pageNumber - 1) * pageSize;

    const { count, rows } = await this.orderModel.findAndCountAll({
      limit: pageSize,
      offset,
      where: options.filter,
      order:[['createdAt','DESC']]
    });

    return {
      data: this.orderMapper.fromOrdersModelToOrders(rows),
      meta: {
        itemCount: count,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageCount: Math.ceil(count / pageSize),
      },
    };
  }

  async getOneByIdOrFail(id: string): Promise<IOrder> {
    const order = await OrderModel.findByPk(id);
    if (!order) throw new OrderNotFoundException(id);
    return this.orderMapper.fromOrderModelToOrder(order);
  }

  async saveOne(createOrderDto: ICreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create(createOrderDto);
    return this.orderMapper.fromOrderModelToOrder(order);
  }

  async updateOneOrFail(id: string, updateOrderDto: IUpdateOrderDto): Promise<IOrder> {
    const order = await this.getOneModelByIdOrFail(id);

    Object.assign(order, updateOrderDto);
    await order.save();
    return this.orderMapper.fromOrderModelToOrder(order);
  }

  async deleteOneOrFail(id: string): Promise<void> {
    const order = await this.getOneModelByIdOrFail(id);
    await order.destroy();
  }
}
