import request from 'supertest';
import app from '../index';
import { Shipment } from '../interfaces/Shipment';

describe('Shipments API Endpoints', () => {
  it('should create a new shipment', async () => {
    const res = await request(app)
      .post('/shipments')
      .send({
        name: 'Test Shipment',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Shipment');
  });

  it('should get all shipments', async () => {
    await request(app)
      .post('/shipments')
      .send({
        name: 'Another Shipment',
      });
    const res = await request(app).get('/shipments');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a shipment', async () => {
    const shipmentRes = await request(app)
      .post('/shipments')
      .send({
        name: 'To Be Updated',
      });
    const shipmentId = shipmentRes.body.id;

    const res = await request(app)
      .put(`/shipments/${shipmentId}`)
      .send({
        name: 'Updated Shipment Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Shipment Name');
  });

  it('should delete a shipment', async () => {
    const shipmentRes = await request(app)
      .post('/shipments')
      .send({
        name: 'To Be Deleted',
      });
    const shipmentId = shipmentRes.body.id;

    const res = await request(app).delete(`/shipments/${shipmentId}`);
    expect(res.statusCode).toEqual(204);

    const allShipmentsRes = await request(app).get('/shipments');
    const deletedShipment = allShipmentsRes.body.find((s: Shipment) => s.id === shipmentId);
    expect(deletedShipment).toBeUndefined();
  });
});
