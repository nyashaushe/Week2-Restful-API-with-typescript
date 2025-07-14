import { Request, Response } from 'express';
import { Review } from '../interfaces/Review.js';

// In-memory store for reviews
let reviews: Review[] = [];
let currentId = 1;

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve a list of all reviews
 *     responses:
 *       200:
 *         description: Successful operation
 */
export const getReviews = (req: Request, res: Response) => {
  res.json(reviews);
};

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the review
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Name is required
 */
export const createReview = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newReview: Review = {
    id: currentId++,
    name,
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
};

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     description: Update a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to update
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
 *                 description: The name of the review
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Review not found
 */
export const updateReview = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const reviewIndex = reviews.findIndex(r => r.id === parseInt(id, 10));

  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  reviews[reviewIndex].name = name;
  res.json(reviews[reviewIndex]);
};

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Review not found
 */
export const deleteReview = (req: Request, res: Response) => {
  const { id } = req.params;
  const reviewIndex = reviews.findIndex(r => r.id === parseInt(id, 10));

  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  reviews.splice(reviewIndex, 1);
  res.status(204).send();
};

// Helper function for testing to reset the reviews array
export const resetReviews = () => {
  reviews = [];
  currentId = 1;
};