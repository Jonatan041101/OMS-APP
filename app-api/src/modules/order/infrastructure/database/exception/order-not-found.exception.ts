import { NotFoundException } from '../../../../../common/base/infrastructure/database/exception/not-found.exception';

export class OrderNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Order with ID ${id} not found.`);
  }
}
