import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

// Create post
router.post('/create', protectRoute, createPost);

export default router;
