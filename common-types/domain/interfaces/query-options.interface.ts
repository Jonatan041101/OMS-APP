import { IBaseEntity } from "../entities/base.entity.interface";

type OnlyAttributes<Entity> = {
  [P in keyof Entity]: Entity[P] extends IBaseEntity[] | IBaseEntity | Function
    ? never
    : P;
}[keyof Entity];

export type PageOptions = {
  number?: number;
  size?: number;
  offset?: number;
};

export type FilterOptions<Entity> = Partial<{
  [P in OnlyAttributes<Entity>]?: Entity[P];
}>;

export type FieldOptions<Entity> = OnlyAttributes<Entity>[];

export interface IGetAllOptionsQuery<Entity> {
  page?: PageOptions;
  filter?: FilterOptions<Entity>;
}
