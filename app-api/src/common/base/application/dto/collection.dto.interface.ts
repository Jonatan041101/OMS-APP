import { IPagingCollectionData } from '@oms/common-types';

export interface ICollection<Entity extends object> {
  data: Entity[];
  meta: IPagingCollectionData;
}
