import request from 'supertest';
import app from '../index';
import { Order } from '../interfaces/Order';

describe('Orders API Endpoints', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        name: 'Test Order',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Order');
  });

  it('should get all orders', async () => {
    await request(app)
      .post('/orders')
      .send({
        name: 'Another Order',
      });
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an order', async () => {
    const orderRes = await request(app)
      .post('/orders')
      .send({
        name: 'To Be Updated',
      });
    const orderId = orderRes.body.id;

    const res = await request(app)
      .put(`/orders/${orderId}`)
      .send({
        name: 'Updated Order Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Order Name');
  });

  it('should delete an order', async () => {
    const orderRes = await request(app)
      .post('/orders')
      .send({
        name: 'To Be Deleted',
      });
    const orderId = orderRes.body.id;

    const res = await request(app).delete(`/orders/${orderId}`);
    expect(res.statusCode).toEqual(204);

    const allOrdersRes = await request(app).get('/orders');
    const deletedOrder = allOrdersRes.body.find((o: Order) => o.id === orderId);
    expect(deletedOrder).toBeUndefined();
  });
});
