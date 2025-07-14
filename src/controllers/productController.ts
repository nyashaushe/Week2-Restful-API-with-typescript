import { Request, Response } from 'express';
import { Product } from '../interfaces/Product.js';

// In-memory store for products
let products: Product[] = [];
let currentId = 1;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Name is required
 */
export const createProduct = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newProduct: Product = {
    id: currentId++,
    name,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
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
 *                 description: The name of the product
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Product not found
 */
export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const productIndex = products.findIndex(p => p.id === parseInt(id, 10));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex].name = name;
  res.json(products[productIndex]);
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Product not found
 */
export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id, 10));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the products array
export const resetProducts = () => {
  products = [];
  currentId = 1;
};