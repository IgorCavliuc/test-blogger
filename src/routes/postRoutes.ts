import { Router } from 'express';
import { authorizeUser } from '../middlewares/authMiddleware';
import PostController from '../controllers/postController';

const router = Router();
router.post('/post', authorizeUser, PostController.createPost);
router.put('/post/:postId', authorizeUser, PostController.updatePost);
router.delete('/post/:postId', authorizeUser, PostController.deletePost);
router.put('/post/:postId/publish', authorizeUser, PostController.publishPost);
router.put('/post/:postId/hide', authorizeUser, PostController.hidePost);
router.get('/allpost', PostController.getAllPosts);

export default router;
