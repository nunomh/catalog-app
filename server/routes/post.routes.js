import express from 'express';
import {
    getFeedPosts,
    getPost,
    createPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
} from '../controllers/post.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/feed', protectRoute, getFeedPosts);
router.get('/:id', getPost);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/reply/:id', protectRoute, replyToPost);

export default router;
