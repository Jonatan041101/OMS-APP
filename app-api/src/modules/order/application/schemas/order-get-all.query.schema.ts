import { Status } from '@oms/common-types';
import * as Yup from 'yup';

export const orderGetAllQuerySchema = Yup.object({
  page: Yup.object({
    number: Yup.number()
      .transform((_, originalValue) => (isNaN(originalValue) ? NaN : Number(originalValue)))
      .typeError('page.number must be a number')
      .integer('page.number must be an integer')
      .positive('page.number must be positive')
      .notRequired(),

    size: Yup.number()
      .transform((_, originalValue) => (isNaN(originalValue) ? NaN : Number(originalValue)))
      .typeError('page.size must be a number')
      .integer('page.size must be an integer')
      .positive('page.size must be positive')
      .notRequired(),
  })
    .default({})
    .optional(),

  filter: Yup.object({
    status: Yup.string().oneOf([Status.CANCELLED, Status.PENDING, Status.COMPLETED]).notRequired(),
  })
    .default({})
    .optional(),
});
