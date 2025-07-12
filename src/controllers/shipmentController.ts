import { Request, Response } from 'express';
import { query } from '../services/db';
import { Shipment } from '../interfaces/Shipment';

/**
 * @swagger
 * /shipments:
 *   get:
 *     summary: Get all shipments
 *     description: Retrieve a list of all shipments
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getShipments = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM shipments');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /shipments:
 *   post:
 *     summary: Create a new shipment
 *     description: Create a new shipment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the shipment
 *     responses:
 *       201:
 *         description: Successful operation
 */
export const createShipment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO shipments (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /shipments/{id}:
 *   put:
 *     summary: Update a shipment
 *     description: Update a shipment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shipment to update
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
 *                 description: The name of the shipment
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Shipment not found
 */
export const updateShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE shipments SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /shipments/{id}:
 *   delete:
 *     summary: Delete a shipment
 *     description: Delete a shipment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shipment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Shipment not found
 */
export const deleteShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM shipments WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};