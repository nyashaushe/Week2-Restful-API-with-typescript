import { Request, Response } from 'express';
import { query } from '../services/db';
import { Invoice } from '../interfaces/Invoice';

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     description: Retrieve a list of all invoices
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM invoices');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     description: Create a new invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the invoice
 *     responses:
 *       201:
 *         description: Successful operation
 */
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO invoices (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Update a invoice
 *     description: Update a invoice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the invoice to update
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
 *                 description: The name of the invoice
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Invoice not found
 */
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE invoices SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete a invoice
 *     description: Delete a invoice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the invoice to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Invoice not found
 */
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM invoices WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};