import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { Database } from './config/database.config';
import { environmentConfig } from './config/environment.config';
import { OrderModule } from './modules/order/order.module';
import { Sequelize } from 'sequelize';
import { normalizeQueryParams } from './common/base/application/middleware/normalize-query-params.middleware';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { ENVIRONMENT } from './config/environment.enum';

class App {
  private app: express.Application;
  private database: Database = Database.getInstance();
  private apiVersion = 1;
  public server: Server<typeof IncomingMessage, typeof ServerResponse>;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
  }

  public getApp() {
    return this.app;
  }

  async initialize() {
    await this.initializeRoutes();
    this.initialize404Handling();
    this.initializeErrorHandling();
  }

  private async initializeSequelize(): Promise<Sequelize> {
    try {
      console.log('Firebase Admin initialized successfully');
      return await this.database.getSequelize();
    } catch (error) {
      console.error('Failed to initialize Firebase Admin', error as Error);
      throw error;
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: 'http://localhost:3500',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      }),
    );

    this.app.use(express.json());
  }

  private async initializeRoutes(): Promise<void> {
    const sequelize = await this.initializeSequelize();
    const orderModule = new OrderModule(sequelize);
    await this.database.syncDatabase(sequelize);
    const API_PREFIX = `/api/v${this.apiVersion}`;

    this.app.use(`/api/v1/order`, orderModule.getRouter());
    this.app.get(`${API_PREFIX}/health`, (req, res) => {
      res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
        environment: environmentConfig.nodeEnv,
      });
    });
    console.log(API_PREFIX);
    this.app.use(normalizeQueryParams);
  }

  private initialize404Handling(): void {
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    });
  }

  private initializeErrorHandling(): void {
    const validEnvironment =
      environmentConfig.nodeEnv === ENVIRONMENT.DEVELOPMENT ||
      environmentConfig.nodeEnv === ENVIRONMENT.AUTOMATED_TESTS;
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.log();
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(validEnvironment && {
          error: err.message,
        }),
      });
    });
  }

  public async start() {
    try {
      await this.initialize();
      const port = environmentConfig.port;
      this.server = this.app.listen(port, () => {
        console.log(`🚀 Servidor ejecutándose en el puerto ${port}`);
        console.log(`📊 Health check: http://localhost:${port}/health`);
        console.log(`📦 API Orders: http://localhost:${port}/api/v1/order`);
      });
    } catch (error) {
      console.error('❌ Error al inicializar la aplicación:', error);
      process.exit(1);
    }
  }

  close() {
    this.server.close();
  }
}

export const app = new App();
