import { Request, Response } from 'express';
import { Task } from '../interfaces/Task.js';

// In-memory store for tasks
let tasks: Task[] = [];
let currentId = 1;

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Title is required
 */
export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask: Task = {
    id: currentId++,
    title,
    description: description || '',
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               completed:
 *                 type: boolean
 *                 description: Whether the task is completed
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Task not found
 */
export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id, 10));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const originalTask = tasks[taskIndex];

  tasks[taskIndex] = {
    ...originalTask,
    title: title !== undefined ? title : originalTask.title,
    description: description !== undefined ? description : originalTask.description,
    completed: completed !== undefined ? completed : originalTask.completed,
  };

  res.json(tasks[taskIndex]);
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Task not found
 */
export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id, 10));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the tasks array
export const resetTasks = () => {
  tasks = [];
  currentId = 1;
};