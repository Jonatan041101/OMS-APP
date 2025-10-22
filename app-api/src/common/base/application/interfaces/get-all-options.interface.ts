import { IGetAllOptionsQuery } from '@oms/common-types';
import { Request } from 'express';

export type IGetAllOptionsRequest<Entity extends object> = Request<
  unknown,
  unknown,
  unknown,
  IGetAllOptionsQuery<Entity>
>;
