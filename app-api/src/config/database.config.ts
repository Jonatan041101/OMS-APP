import { Sequelize } from 'sequelize';
import { environmentConfig } from './environment.config';
import { ENVIRONMENT } from './environment.enum';

export class Database {
  private static instance: Database;

  private constructor() {}
  async getSequelize() {
    let sequelize: Sequelize;
    if (environmentConfig.nodeEnv === ENVIRONMENT.AUTOMATED_TESTS) {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
      });
    } else {
      sequelize = new Sequelize(
        environmentConfig.database.name,
        environmentConfig.database.username,
        environmentConfig.database.password,
        {
          host: environmentConfig.database.host,
          dialect: 'postgres',
        },
      );
    }

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return sequelize;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  public async syncDatabase(sequelize: Sequelize) {
    try {
      await sequelize.sync({ alter: true, force: false });
      console.log('✅ Base de datos sincronizada correctamente');
    } catch (error) {
      console.error('❌ Error al sincronizar la base de datos:', error);
      throw error;
    }
  }
}
