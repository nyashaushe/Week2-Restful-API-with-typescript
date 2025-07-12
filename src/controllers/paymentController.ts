import { Request, Response } from 'express';
import { query } from '../services/db';
import { Payment } from '../interfaces/Payment';

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve a list of all payments
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getPayments = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM payments');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     description: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the payment
 *     responses:
 *       201:
 *         description: Successful operation
 */
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO payments (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment
 *     description: Update a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to update
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
 *                 description: The name of the payment
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Payment not found
 */
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE payments SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     description: Delete a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Payment not found
 */
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};