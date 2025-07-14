import request from 'supertest';
import app from '../index';
import { User } from '../interfaces/User';

describe('Users API Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
  });

  it('should get all users', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a user', async () => {
    const userRes = await request(app)
      .post('/users')
      .send({
        name: 'Update Me',
        email: 'update.me@example.com',
      });
    const userId = userRes.body.id;

    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Updated Name',
        email: 'updated.email@example.com',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Name');
  });

  it('should delete a user', async () => {
    const userRes = await request(app)
      .post('/users')
      .send({
        name: 'Delete Me',
        email: 'delete.me@example.com',
      });
    const userId = userRes.body.id;

    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/users/${userId}`);
    // This check is tricky with in-memory store as there's no single get by id endpoint
    // We check if the user is not in the list anymore
    const allUsersRes = await request(app).get('/users');
    const deletedUser = allUsersRes.body.find((user: User) => user.id === userId);
    expect(deletedUser).toBeUndefined();
  });
});
