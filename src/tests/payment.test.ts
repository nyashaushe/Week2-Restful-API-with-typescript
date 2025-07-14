import request from 'supertest';
import app from '../index';
import { Payment } from '../interfaces/Payment';

describe('Payments API Endpoints', () => {
  it('should create a new payment', async () => {
    const res = await request(app)
      .post('/payments')
      .send({
        name: 'Test Payment',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Payment');
  });

  it('should get all payments', async () => {
    await request(app)
      .post('/payments')
      .send({
        name: 'Another Payment',
      });
    const res = await request(app).get('/payments');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a payment', async () => {
    const paymentRes = await request(app)
      .post('/payments')
      .send({
        name: 'To Be Updated',
      });
    const paymentId = paymentRes.body.id;

    const res = await request(app)
      .put(`/payments/${paymentId}`)
      .send({
        name: 'Updated Payment Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Payment Name');
  });

  it('should delete a payment', async () => {
    const paymentRes = await request(app)
      .post('/payments')
      .send({
        name: 'To Be Deleted',
      });
    const paymentId = paymentRes.body.id;

    const res = await request(app).delete(`/payments/${paymentId}`);
    expect(res.statusCode).toEqual(204);

    const allPaymentsRes = await request(app).get('/payments');
    const deletedPayment = allPaymentsRes.body.find((p: Payment) => p.id === paymentId);
    expect(deletedPayment).toBeUndefined();
  });
});
