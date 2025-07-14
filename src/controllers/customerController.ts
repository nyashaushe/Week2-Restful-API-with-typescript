import { Request, Response } from 'express';
import { Customer } from '../interfaces/Customer.js';

// In-memory store for customers
let customers: Customer[] = [];
let currentId = 1;

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getCustomers = (req: Request, res: Response) => {
  res.json(customers);
};

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the customer
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Name is required
 */
export const createCustomer = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newCustomer: Customer = {
    id: currentId++,
    name,
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer
 *     description: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to update
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
 *                 description: The name of the customer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Customer not found
 */
export const updateCustomer = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const customerIndex = customers.findIndex(c => c.id === parseInt(id, 10));

  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const originalCustomer = customers[customerIndex];

  customers[customerIndex] = {
      ...originalCustomer,
      name: name !== undefined ? name : originalCustomer.name,
  };

  res.json(customers[customerIndex]);
};

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     description: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Customer not found
 */
export const deleteCustomer = (req: Request, res: Response) => {
  const { id } = req.params;
  const customerIndex = customers.findIndex(c => c.id === parseInt(id, 10));

  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  customers.splice(customerIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the customers array
export const resetCustomers = () => {
  customers = [];
  currentId = 1;
};