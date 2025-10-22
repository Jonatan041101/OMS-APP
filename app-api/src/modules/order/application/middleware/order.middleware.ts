import { OrderValidation } from '../validations/order.validations';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';

export class OrderMiddleware {
  private readonly orderValidation;
  constructor() {
    this.orderValidation = new OrderValidation();
  }
  private handleValidationError(res: Response, error?: ValidationError | unknown) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors?.map((d) => d),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  validateSaveOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.orderValidation.validateSaveOne(req.body);
      return next();
    } catch (error) {
      this.handleValidationError(res, error);
    }
  };

  validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.orderValidation.validateUpdate(req.body);
      return next();
    } catch (error) {
      this.handleValidationError(res, error);
    }
  };

  validateParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.orderValidation.validateParams(req.params);
      return next();
    } catch (error) {
      this.handleValidationError(res, error);
    }
  };

  validateGetAllQueryParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = await this.orderValidation.validateGetAllQueryParams(req.query);
      req.query = query as Record<string, any>;
      next();
    } catch (error) {
      this.handleValidationError(res, error);
    }
  };
}
