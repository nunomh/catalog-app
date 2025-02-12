import express from 'express';
import { getPost, createPost, deletePost, likeUnlikePost } from '../controllers/post.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/:id', getPost);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.post('/like/:id', protectRoute, likeUnlikePost);

export default router;
