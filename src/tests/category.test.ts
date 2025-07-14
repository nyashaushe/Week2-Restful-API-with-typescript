import request from 'supertest';
import app from '../index';
import { Category } from '../interfaces/Category';

describe('Categories API Endpoints', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Category');
  });

  it('should get all categories', async () => {
    await request(app)
      .post('/categories')
      .send({
        name: 'Another Category',
      });
    const res = await request(app).get('/categories');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a category', async () => {
    const categoryRes = await request(app)
      .post('/categories')
      .send({
        name: 'To Be Updated',
      });
    const categoryId = categoryRes.body.id;

    const res = await request(app)
      .put(`/categories/${categoryId}`)
      .send({
        name: 'Updated Category Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Category Name');
  });

  it('should delete a category', async () => {
    const categoryRes = await request(app)
      .post('/categories')
      .send({
        name: 'To Be Deleted',
      });
    const categoryId = categoryRes.body.id;

    const res = await request(app).delete(`/categories/${categoryId}`);
    expect(res.statusCode).toEqual(204);

    const allCategoriesRes = await request(app).get('/categories');
    const deletedCategory = allCategoriesRes.body.find((cat: Category) => cat.id === categoryId);
    expect(deletedCategory).toBeUndefined();
  });
});
