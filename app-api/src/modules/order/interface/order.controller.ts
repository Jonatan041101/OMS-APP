import { Request, Response } from 'express';
import { OrderService } from '../application/services/order.service';
import { IGetAllOptionsRequest } from '../../../common/base/application/interfaces/get-all-options.interface';
import { Order } from '../domain/order.domain';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  getAll = async (req: IGetAllOptionsRequest<Order>, res: Response): Promise<void> => {
    const orders = await this.orderService.getAll(req.query);
    res.json({
      success: true,
      message: 'Orders retrieved successfully.',
      ...orders,
    });
  };

  saveOne = async (req: Request, res: Response): Promise<void> => {
    const order = await this.orderService.saveOne(req.body);
    res.json({
      success: true,
      message: 'The order was created successfully.',
      data: order,
    });
  };

  getOneByIdOrFail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const order = await this.orderService.getOneByIdOrFail(id);
    res.json({
      succes: true,
      message: `Order with ID ${id} retrieved successfully.`,
      data: order,
    });
  };

  updateOneOrFail = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const order = await this.orderService.updateOneOrFail(id, req.body);
    res.json({
      succes: true,
      message: `The order with ID ${id} was successfully updated.`,
      data: order,
    });
  };

  deleteOneOrFail = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    await this.orderService.deleteOneOrFail(id);

    res.json({
      success: true,
      message: `The order with ID ${id} was deleted.`,
    });
  };
}
