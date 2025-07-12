import supertest from 'supertest';
import app from '../src/index';
import { Pool } from 'pg';
import { dbConfig } from '../src/config';

const request = supertest(app);
const pool = new Pool(dbConfig);

describe('Tasks API Endpoints', () => {
  beforeAll(async () => {
    // Clean the database before running tests
    await pool.query('DELETE FROM tasks');
  });

  afterAll(async () => {
    // Clean up and close the connection
    await pool.query('DELETE FROM tasks');
    pool.end();
  });

  it('should create a new task', async () => {
    const res = await request.post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Task');
  });

  it('should get all tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a task', async () => {
    // First, create a task to update
    const createTaskRes = await request.post('/tasks')
      .send({ title: 'Task to Update', description: 'Test Description' });
    const taskId = createTaskRes.body.id;

    // Then, update the task
    const updateTaskRes = await request.put(`/tasks/${taskId}`)
      .send({ title: 'Updated Task', description: 'Updated Description', completed: true });
    expect(updateTaskRes.statusCode).toEqual(200);
    expect(updateTaskRes.body.title).toEqual('Updated Task');
    expect(updateTaskRes.body.completed).toEqual(true);
  });

  it('should delete a task', async () => {
    // First, create a task to delete
    const createTaskRes = await request.post('/tasks')
      .send({ title: 'Task to Delete', description: 'Test Description' });
    const taskId = createTaskRes.body.id;

    // Then, delete the task
    const deleteTaskRes = await request.delete(`/tasks/${taskId}`);
    expect(deleteTaskRes.statusCode).toEqual(204);

    // Verify that the task is deleted
    const getTaskRes = await request.get(`/tasks/${taskId}`);
    expect(getTaskRes.statusCode).toEqual(404);
  });
});