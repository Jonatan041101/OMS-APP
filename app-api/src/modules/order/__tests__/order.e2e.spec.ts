import request from 'supertest';
import { app } from '../../../main';
import { Application } from 'express';

describe('OrderController', () => {
  let appServer: Application;
  const API_PREFIX = '/api/v1';
  const ORDER_ID_NOT_FOUND = 'f26937d6-b975-44b1-b135-135a05773da1';
  const orderPayload = {
    customerName: 'John Doe',
    item: '3D Printer',
    quantity: 2,
    status: 'pending',
  };
  beforeAll(async () => {
    await app.start();
    appServer = app.getApp();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST - /order', () => {
    it('Should create a new order successfully', async () => {
      const response = await request(appServer)
        .post(`${API_PREFIX}/order`)
        .send(orderPayload)
        .expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('The order was created successfully.');
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          customerName: orderPayload.customerName,
          item: orderPayload.item,
          status: orderPayload.status,
          quantity: orderPayload.quantity,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('Should return a validation error when required fields are missing', async () => {
      const response = await request(appServer)
        .post(`${API_PREFIX}/order`)
        .send({
          customerName: 'John Doe',
          quantity: 2,
          status: 'pending',
        })
        .expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation error');
      expect(response.body.details[0]).toBe('item is required');
    });
  });

  describe('GET /order', () => {
    it('Should retrieve all existing  orders', async () => {
      await request(appServer).post(`${API_PREFIX}/order`).send(orderPayload).expect(200);
      const response = await request(appServer).get('/api/v1/order').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET - /order/:id', () => {
    it('Should retrieve a specific order by its ID', async () => {
      const { body } = await request(appServer)
        .post(`${API_PREFIX}/order`)
        .send(orderPayload)
        .expect(200);
      const response = await request(appServer).get(`/api/v1/order/${body.data.id}`).expect(200);
      expect(response.body.data.customerName).toBe(orderPayload.customerName);
      expect(response.body.data.quantity).toBe(orderPayload.quantity);
    });

    it('Should return an error when the order ID does not exist', async () => {
      const response = await request(appServer)
        .get(`/api/v1/order/${ORDER_ID_NOT_FOUND}`)
        .expect(500);
      console.log(response.body, 'response');
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(`Order with ID ${ORDER_ID_NOT_FOUND} not found.`);
    });

    it('Should return a validation error when the order ID is not a valid UUID', async () => {
      const response = await request(appServer).get('/api/v1/order/1').expect(400);
      console.log(response.body, 'response');
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation error');
      expect(response.body.details[0]).toBe('id must be a valid UUID');
    });
  });

  describe('PATCH - /order/:id', () => {
    it('Should update an order successfully', async () => {
      const { body } = await request(appServer)
        .post(`${API_PREFIX}/order`)
        .send(orderPayload)
        .expect(200);
      const response = await request(appServer)
        .patch(`/api/v1/order/${body.data.id}`)
        .send({ status: 'completed' })
        .expect(200);

      expect(response.body.data.status).toBe('completed');
    });

    it('Should return an error when trying to update a non-existent order', async () => {
      const response = await request(appServer)
        .patch(`/api/v1/order/${ORDER_ID_NOT_FOUND}`)
        .send(orderPayload)
        .expect(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(`Order with ID ${ORDER_ID_NOT_FOUND} not found.`);
    });
  });

  describe('DELETE - /order/:id', () => {
    it('Should delete an order successfully', async () => {
      const { body } = await request(appServer)
        .post(`${API_PREFIX}/order`)
        .send(orderPayload)
        .expect(200);
      const response = await request(appServer).delete(`/api/v1/order/${body.data.id}`).expect(200);

      expect(response.body.message).toContain(`The order with ID ${body.data.id} was deleted.`);
      expect(response.body.success).toBe(true);
    });

    it('Should return an error when trying to delete a non-existent order', async () => {
      const response = await request(appServer)
        .delete(`/api/v1/order/${ORDER_ID_NOT_FOUND}`)
        .expect(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(`Order with ID ${ORDER_ID_NOT_FOUND} not found.`);
    });
  });
});
