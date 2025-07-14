import { Request, Response } from 'express';
import { User } from '../interfaces/User.js';

// In-memory store for users
let users: User[] = [];
let currentId = 1;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Name and email are required
 */
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser: User = {
    id: currentId++,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
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
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const originalUser = users[userIndex];

  users[userIndex] = {
    ...originalUser,
    name: name !== undefined ? name : originalUser.name,
    email: email !== undefined ? email : originalUser.email,
  };

  res.json(users[userIndex]);
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the users array
export const resetUsers = () => {
  users = [];
  currentId = 1;
};