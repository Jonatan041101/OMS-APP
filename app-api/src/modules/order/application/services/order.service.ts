import { IGetAllOptionsQuery } from '@oms/common-types';
import { Order } from '../../domain/order.domain';
import { ICreateOrderDto } from '../dto/create-order.dto.interface';
import { ResponseOrderDto, ResponseOrderManyDto } from '../dto/response-order.dto.interface';
import { IUpdateOrderDto } from '../dto/update-order.dto.interface';
import { OrderMapper } from '../mapper/order.mapper';
import { IOrderRepository } from '../repository/order.repository.interface';

export class OrderService {
  private readonly orderMapper: OrderMapper;
  constructor(private readonly orderRepository: IOrderRepository) {
    this.orderMapper = new OrderMapper();
  }

  async saveOne(createOrderDto: ICreateOrderDto): Promise<ResponseOrderDto> {
    const order = await this.orderRepository.saveOne(createOrderDto);
    return this.orderMapper.fromOrderToResponseOrderDto(order);
  }

  async getOneByIdOrFail(id: string) {
    const order = await this.orderRepository.getOneByIdOrFail(id);
    return this.orderMapper.fromOrderToResponseOrderDto(order);
  }

  async updateOneOrFail(id: string, updateOrderDto: IUpdateOrderDto): Promise<ResponseOrderDto> {
    const order = await this.orderRepository.updateOneOrFail(id, updateOrderDto);
    return this.orderMapper.fromOrderToResponseOrderDto(order);
  }

  async getAll(options: IGetAllOptionsQuery<Order>): Promise<ResponseOrderManyDto> {
    const orders = await this.orderRepository.getAll(options);
    return {
      ...orders,
      data: orders.data.map((order) => this.orderMapper.fromOrderToResponseOrderDto(order)),
    };
  }

  async deleteOneOrFail(id: string): Promise<void> {
    return this.orderRepository.deleteOneOrFail(id);
  }
}
