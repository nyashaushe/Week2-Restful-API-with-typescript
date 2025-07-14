import { Request, Response } from 'express';
import { Order } from '../interfaces/Order.js';

// In-memory store for orders
let orders: Order[] = [];
let currentId = 1;

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
export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
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
 *       400:
 *         description: Name is required
 */
export const createOrder = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newOrder: Order = {
    id: currentId++,
    name,
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
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
export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const orderIndex = orders.findIndex(o => o.id === parseInt(id, 10));

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders[orderIndex].name = name;
  res.json(orders[orderIndex]);
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
export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const orderIndex = orders.findIndex(o => o.id === parseInt(id, 10));

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders.splice(orderIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the orders array
export const resetOrders = () => {
  orders = [];
  currentId = 1;
};