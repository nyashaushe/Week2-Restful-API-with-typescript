import { Router, Request, Response } from "express";
import {
  UserManager,
  ValidationError,
  NetworkError,
} from "../demo/requirements-demo";

const router = Router();
const userManager = new UserManager();

/**
 * @swagger
 * /api/demo/users:
 *   post:
 *     summary: Add a new user (demonstrates classes, exception handling)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/users", (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = userManager.addUser(name, email);

    console.log(`🌐 API: User created via REST endpoint`);
    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`🚫 API: Validation error - ${error.message}`);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      console.error(`💥 API: Unexpected error - ${error}`);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
});

/**
 * @swagger
 * /api/demo/users:
 *   get:
 *     summary: Get all active users (demonstrates lists/arrays)
 *     responses:
 *       200:
 *         description: List of active users
 */
router.get("/users", (req: Request, res: Response) => {
  const activeUsers = userManager.getActiveUsers();
  console.log(`📋 API: Retrieved ${activeUsers.length} active users`);

  res.json({
    success: true,
    data: activeUsers,
    count: activeUsers.length,
  });
});

/**
 * @swagger
 * /api/demo/users/{id}/score:
 *   get:
 *     summary: Calculate user score using recursion
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User score calculated
 *       404:
 *         description: User not found
 */
router.get("/users/:id/score", (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const score = userManager.calculateUserScore(userId);

    console.log(`🎯 API: Calculated score for user ${userId}: ${score}`);
    res.json({
      success: true,
      data: {
        userId,
        score,
        calculation: "factorial",
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
});

/**
 * @swagger
 * /api/demo/users/{id}/fetch:
 *   get:
 *     summary: Fetch user data asynchronously
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data fetched
 *       404:
 *         description: User not found
 *       500:
 *         description: Network error
 */
router.get("/users/:id/fetch", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = await userManager.fetchUserData(userId);

    if (userData) {
      res.json({
        success: true,
        data: userData,
        message: "User data fetched successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(`🌐 API: Network error - ${error.message}`);
      res.status(500).json({
        success: false,
        error: "Network error occurred",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
});

/**
 * @swagger
 * /api/demo/users/batch:
 *   post:
 *     summary: Create multiple users in batch (demonstrates arrays)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Batch processing completed
 */
router.post("/users/batch", (req: Request, res: Response) => {
  try {
    const { names } = req.body;

    if (!Array.isArray(names)) {
      return res.status(400).json({
        success: false,
        error: "Names must be an array",
      });
    }

    const createdUsers = userManager.processUserBatch(names);

    console.log(
      `📦 API: Batch processed ${createdUsers.length} users from ${names.length} names`
    );
    res.status(201).json({
      success: true,
      data: createdUsers,
      processed: createdUsers.length,
      total: names.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
