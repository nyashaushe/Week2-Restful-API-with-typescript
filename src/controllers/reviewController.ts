import { Request, Response } from 'express';
import { query } from '../services/db';
import { Review } from '../interfaces/Review';

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
export const getReviews = async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM reviews');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
 */
export const createReview = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { rows } = await query(
      'INSERT INTO reviews (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await query(
      'UPDATE reviews SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};