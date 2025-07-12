import { Request, Response } from 'express';
import { query } from '../services/db';
import { Order } from '../interfaces/Order';

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM orders');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the order
 *     responses:
 *       201:
 *         description: Successful operation
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO orders (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update a order
 *     description: Update a order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the order
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Order not found
 */
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE orders SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a order
 *     description: Delete a order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Order not found
 */
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};