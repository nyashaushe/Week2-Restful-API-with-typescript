import { Request, Response } from 'express';
import { Shipment } from '../interfaces/Shipment.js';

// In-memory store for shipments
let shipments: Shipment[] = [];
let currentId = 1;

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
export const getShipments = (req: Request, res: Response) => {
  res.json(shipments);
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
 *       400:
 *         description: Name is required
 */
export const createShipment = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newShipment: Shipment = {
    id: currentId++,
    name,
  };

  shipments.push(newShipment);
  res.status(201).json(newShipment);
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
export const updateShipment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const shipmentIndex = shipments.findIndex(s => s.id === parseInt(id, 10));

  if (shipmentIndex === -1) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  shipments[shipmentIndex].name = name;
  res.json(shipments[shipmentIndex]);
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
export const deleteShipment = (req: Request, res: Response) => {
  const { id } = req.params;
  const shipmentIndex = shipments.findIndex(s => s.id === parseInt(id, 10));

  if (shipmentIndex === -1) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  shipments.splice(shipmentIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the shipments array
export const resetShipments = () => {
  shipments = [];
  currentId = 1;
};