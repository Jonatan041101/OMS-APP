import { createOrderSchema } from '../schemas/create-order.schema.validation';
import { orderGetAllQuerySchema } from '../schemas/order-get-all.query.schema';
import { orderIdParamsSchema } from '../schemas/order-id-params.schema.validation';
import { updateOrderSchema } from '../schemas/update-order.schema.validation';

export class OrderValidation {
  validateSaveOne(body: unknown) {
    console.log(body, 'body');
    return createOrderSchema.validate(body);
  }

  validateUpdate(body: unknown) {
    return updateOrderSchema.validate(body);
  }

  validateParams(params: unknown) {
    console.log(params, 'params');
    return orderIdParamsSchema.validate(params);
  }

  validateGetAllQueryParams(query: unknown) {
    return orderGetAllQuerySchema.validate(query);
  }
}
