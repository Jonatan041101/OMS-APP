import { Router } from 'express';
import { OrderPostgresRepository } from './infrastructure/database/order.postgres.repository';
import { OrderService } from './application/services/order.service';
import { OrderController } from './interface/order.controller';
import { OrderMiddleware } from './application/middleware/order.middleware';
import { Sequelize } from 'sequelize';
import { initOrder } from './infrastructure/database/order.model';

const router = Router();

export class OrderModule {
  orderRepository: OrderPostgresRepository;
  orderService: OrderService;
  orderController: OrderController;
  orderMiddleware: OrderMiddleware;

  constructor(sequelize: Sequelize) {
    const OrderModel = initOrder(sequelize);
    this.orderRepository = new OrderPostgresRepository(OrderModel);
    this.orderService = new OrderService(this.orderRepository);
    this.orderController = new OrderController(this.orderService);
    this.orderMiddleware = new OrderMiddleware();
  }

  getRouter() {
    router.get('/:id', this.orderMiddleware.validateParams, this.orderController.getOneByIdOrFail);
    router.get('/', this.orderMiddleware.validateGetAllQueryParams, this.orderController.getAll);
    router.post('/', this.orderMiddleware.validateSaveOne, this.orderController.saveOne);
    router.patch(
      '/:id',
      this.orderMiddleware.validateParams,
      this.orderMiddleware.validateUpdate,
      this.orderController.updateOneOrFail,
    );
    router.delete(
      '/:id',
      this.orderMiddleware.validateParams,
      this.orderController.deleteOneOrFail,
    );
    return router;
  }
}
