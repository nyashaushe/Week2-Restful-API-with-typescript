import { Request, Response } from 'express';
import { Category } from '../interfaces/Category.js';

// In-memory store for categories
let categories: Category[] = [];
let currentId = 1;

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Name is required
 */
export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newCategory: Category = {
    id: currentId++,
    name,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
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
 *                 description: The name of the category
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Category not found
 */
export const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoryIndex = categories.findIndex(c => c.id === parseInt(id, 10));

  if (categoryIndex === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  categories[categoryIndex].name = name;
  res.json(categories[categoryIndex]);
};

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Category not found
 */
export const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryIndex = categories.findIndex(c => c.id === parseInt(id, 10));

  if (categoryIndex === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  categories.splice(categoryIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the categories array
export const resetCategories = () => {
  categories = [];
  currentId = 1;
};