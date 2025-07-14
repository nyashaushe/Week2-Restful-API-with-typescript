import { Request, Response } from 'express';
import { Invoice } from '../interfaces/Invoice.js';

// In-memory store for invoices
let invoices: Invoice[] = [];
let currentId = 1;

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
export const getInvoices = (req: Request, res: Response) => {
  res.json(invoices);
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
 *       400:
 *         description: Name is required
 */
export const createInvoice = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newInvoice: Invoice = {
    id: currentId++,
    name,
  };

  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
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
export const updateInvoice = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const invoiceIndex = invoices.findIndex(i => i.id === parseInt(id, 10));

  if (invoiceIndex === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  invoices[invoiceIndex].name = name;
  res.json(invoices[invoiceIndex]);
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
export const deleteInvoice = (req: Request, res: Response) => {
  const { id } = req.params;
  const invoiceIndex = invoices.findIndex(i => i.id === parseInt(id, 10));

  if (invoiceIndex === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  invoices.splice(invoiceIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the invoices array
export const resetInvoices = () => {
  invoices = [];
  currentId = 1;
};