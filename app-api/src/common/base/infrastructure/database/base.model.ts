import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
// import { environmentConfig } from '../../../../config/environment.config';
// import { ENVIRONMENT } from '../../../../config/environment.enum';
// const id =
//   environmentConfig.nodeEnv === ENVIRONMENT.AUTOMATED_TESTS
//     ? {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       }
//     : {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       };
export const withBaseModelColumns = <BaseModel extends Model>(
  columns: ModelAttributes<BaseModel, Optional<any, never>>,
): any => {
  return {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ...columns,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  };
};
