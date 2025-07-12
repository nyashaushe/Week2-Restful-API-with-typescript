import { Pool } from 'pg';
import { dbConfig } from '../src/config';

const pool = new Pool(dbConfig);

beforeAll(async () => {
  // Clean the database before running tests
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM users');
  await pool.query('DELETE FROM products');
  await pool.query('DELETE FROM orders');
  await pool.query('DELETE FROM invoices');
    await pool.query('DELETE FROM payments');
    await pool.query('DELETE FROM shipments');
    await pool.query('DELETE FROM reviews');
    await pool.query('DELETE FROM categories');
});

afterAll(async () => {
  // Clean up and close the connection
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM users');
  await pool.query('DELETE FROM products');
  await pool.query('DELETE FROM orders');
  await pool.query('DELETE FROM invoices');
    await pool.query('DELETE FROM payments');
    await pool.query('DELETE FROM shipments');
    await pool.query('DELETE FROM reviews');
    await pool.query('DELETE FROM categories');
  pool.end();
});