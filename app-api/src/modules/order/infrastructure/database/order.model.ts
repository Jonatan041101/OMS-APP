import { withBaseModelColumns } from '../../../../common/base/infrastructure/database/base.model';
import { environmentConfig } from '../../../../config/environment.config';
import { ENVIRONMENT } from '../../../../config/environment.enum';
import { Status } from '@oms/common-types';
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class OrderModel extends Model<
  InferAttributes<OrderModel>,
  InferCreationAttributes<OrderModel>
> {
  declare id?: string;
  declare customerName: string;
  declare item: string;
  declare quantity: number;
  declare status: Status;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export const initOrder = (sequelize: Sequelize) => {
  OrderModel.init(
    withBaseModelColumns({
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type:
          environmentConfig.nodeEnv === ENVIRONMENT.AUTOMATED_TESTS
            ? DataTypes.STRING
            : DataTypes.ENUM(Status.PENDING, Status.COMPLETED, Status.CANCELLED),
        allowNull: false,
        defaultValue: Status.PENDING,
      },
    }),
    {
      indexes: [
        {
          name: 'order_status_index',
          fields: ['status'],
          unique: false,
        },
      ],
      sequelize,
      tableName: 'order',
      timestamps: true,
      underscored: true,
    },
  );
  return OrderModel;
};
