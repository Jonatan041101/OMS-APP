import request from 'supertest';
import { app } from '../../../main';
import { Application } from 'express';
import { ENVIRONMENT } from '../../../config/environment.enum';

describe('Health Check', () => {
  let appServer: Application;
  beforeAll(async () => {
    await app.start();
    appServer = app.getApp();
  });

  afterAll(() => {
    app.close();
  });

  it('Should confirm that the API is running', async () => {
    const response = await request(appServer).get('/api/v1/health');
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('API is running');
    expect(response.body.environment).toBe(ENVIRONMENT.AUTOMATED_TESTS);
  });
});
