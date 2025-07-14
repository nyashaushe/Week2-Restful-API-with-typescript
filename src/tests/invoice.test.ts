import request from 'supertest';
import app from '../index';
import { Invoice } from '../interfaces/Invoice';

describe('Invoices API Endpoints', () => {
  it('should create a new invoice', async () => {
    const res = await request(app)
      .post('/invoices')
      .send({
        name: 'Test Invoice',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Invoice');
  });

  it('should get all invoices', async () => {
    await request(app)
      .post('/invoices')
      .send({
        name: 'Another Invoice',
      });
    const res = await request(app).get('/invoices');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an invoice', async () => {
    const invoiceRes = await request(app)
      .post('/invoices')
      .send({
        name: 'To Be Updated',
      });
    const invoiceId = invoiceRes.body.id;

    const res = await request(app)
      .put(`/invoices/${invoiceId}`)
      .send({
        name: 'Updated Invoice Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Invoice Name');
  });

  it('should delete an invoice', async () => {
    const invoiceRes = await request(app)
      .post('/invoices')
      .send({
        name: 'To Be Deleted',
      });
    const invoiceId = invoiceRes.body.id;

    const res = await request(app).delete(`/invoices/${invoiceId}`);
    expect(res.statusCode).toEqual(204);

    const allInvoicesRes = await request(app).get('/invoices');
    const deletedInvoice = allInvoicesRes.body.find((i: Invoice) => i.id === invoiceId);
    expect(deletedInvoice).toBeUndefined();
  });
});
