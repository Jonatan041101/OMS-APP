import * as Yup from 'yup';

export const orderIdParamsSchema = Yup.object({
  id: Yup.string().uuid('id must be a valid UUID').required('id is required'),
});
