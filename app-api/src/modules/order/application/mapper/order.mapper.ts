import { Order } from '../../domain/order.domain';
import { OrderModel } from '../../infrastructure/database/order.model';
import { ResponseOrderDto } from '../dto/response-order.dto.interface';

export class OrderMapper {
  fromOrderToResponseOrderDto(order: Order) {
    const responseOrderDto = new ResponseOrderDto();
    responseOrderDto.id = order.id;
    responseOrderDto.customerName = order.customerName;
    responseOrderDto.item = order.item;
    responseOrderDto.status = order.status;
    responseOrderDto.quantity = order.quantity;
    responseOrderDto.createdAt = order.createdAt?.toISOString();
    responseOrderDto.updatedAt = order.updatedAt?.toISOString();
    return responseOrderDto;
  }

  fromOrderModelToOrder(orderModel: OrderModel): Order {
    const order = new Order();
    order.id = orderModel.id!;
    order.customerName = orderModel.customerName;
    order.status = orderModel.status;
    order.item = orderModel.item;
    order.quantity = orderModel.quantity;
    order.createdAt = orderModel.createdAt;
    order.updatedAt = orderModel.updatedAt;
    return order;
  }

  fromOrdersModelToOrders(orderModels: OrderModel[]): Order[] {
    return orderModels.map((orderModel) => this.fromOrderModelToOrder(orderModel));
  }
}
