import { Router } from 'express';
import { authorizeUser } from '../middlewares/authMiddleware';
import PostController from '../controllers/postController'; // Assuming PostController is exported as default

const router = Router();

// Define routes for various post-related actions
// Create a new post
router.post('/post', authorizeUser, PostController.createPost);

// Update a post by providing its postId as a URL parameter
router.put('/post/:postId', authorizeUser, PostController.updatePost);

// Delete a post by providing its postId as a URL parameter
router.delete('/post/:postId', authorizeUser, PostController.deletePost);

// Publish a post by providing its postId as a URL parameter
router.put('/post/:postId/publish', authorizeUser, PostController.publishPost);

// Hide a post by providing its postId as a URL parameter
router.put('/post/:postId/hide', authorizeUser, PostController.hidePost);

// Get all posts (you may want to rename this route to '/posts' for consistency)
router.get('/allpost', PostController.getAllPosts);

export default router;
