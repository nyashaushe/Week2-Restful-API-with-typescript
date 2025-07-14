import { Request, Response } from 'express';
import { Payment } from '../interfaces/Payment.js';

// In-memory store for payments
let payments: Payment[] = [];
let currentId = 1;

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
export const getPayments = (req: Request, res: Response) => {
  res.json(payments);
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
 *       400:
 *         description: Name is required
 */
export const createPayment = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newPayment: Payment = {
    id: currentId++,
    name,
  };

  payments.push(newPayment);
  res.status(201).json(newPayment);
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
export const updatePayment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const paymentIndex = payments.findIndex(p => p.id === parseInt(id, 10));

  if (paymentIndex === -1) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  payments[paymentIndex].name = name;
  res.json(payments[paymentIndex]);
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
export const deletePayment = (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentIndex = payments.findIndex(p => p.id === parseInt(id, 10));

  if (paymentIndex === -1) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  payments.splice(paymentIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the payments array
export const resetPayments = () => {
  payments = [];
  currentId = 1;
};