import dotenv from 'dotenv';

dotenv.config();
export const environmentConfig = {
  database: {
    name: process.env.DB_NAME ?? '',
    port: process.env.DB_PORT ?? '',
    host: process.env.DB_HOST ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
  },
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
