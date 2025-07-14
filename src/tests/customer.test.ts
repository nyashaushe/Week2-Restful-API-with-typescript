import request from 'supertest';
import app from '../index';
import { Customer } from '../interfaces/Customer';

describe('Customers API Endpoints', () => {
  it('should create a new customer', async () => {
    const res = await request(app)
      .post('/customers')
      .send({
        name: 'Test Customer',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Customer');
  });

  it('should get all customers', async () => {
    await request(app)
      .post('/customers')
      .send({
        name: 'Another Customer',
      });
    const res = await request(app).get('/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a customer', async () => {
    const customerRes = await request(app)
      .post('/customers')
      .send({
        name: 'To Be Updated',
      });
    const customerId = customerRes.body.id;

    const res = await request(app)
      .put(`/customers/${customerId}`)
      .send({
        name: 'Updated Customer Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Customer Name');
  });

  it('should delete a customer', async () => {
    const customerRes = await request(app)
      .post('/customers')
      .send({
        name: 'To Be Deleted',
      });
    const customerId = customerRes.body.id;

    const res = await request(app).delete(`/customers/${customerId}`);
    expect(res.statusCode).toEqual(204);

    const allCustomersRes = await request(app).get('/customers');
    const deletedCustomer = allCustomersRes.body.find((c: Customer) => c.id === customerId);
    expect(deletedCustomer).toBeUndefined();
  });
});
