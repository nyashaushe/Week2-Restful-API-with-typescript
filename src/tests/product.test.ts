import request from 'supertest';
import app from '../index';
import { Product } from '../interfaces/Product';

describe('Products API Endpoints', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    await request(app)
      .post('/products')
      .send({
        name: 'Another Product',
      });
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a product', async () => {
    const productRes = await request(app)
      .post('/products')
      .send({
        name: 'To Be Updated',
      });
    const productId = productRes.body.id;

    const res = await request(app)
      .put(`/products/${productId}`)
      .send({
        name: 'Updated Product Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Product Name');
  });

  it('should delete a product', async () => {
    const productRes = await request(app)
      .post('/products')
      .send({
        name: 'To Be Deleted',
      });
    const productId = productRes.body.id;

    const res = await request(app).delete(`/products/${productId}`);
    expect(res.statusCode).toEqual(204);

    const allProductsRes = await request(app).get('/products');
    const deletedProduct = allProductsRes.body.find((p: Product) => p.id === productId);
    expect(deletedProduct).toBeUndefined();
  });
});
