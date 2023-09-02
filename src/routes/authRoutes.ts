import express from 'express';
const router = express.Router();
import authController from '../controllers/authController'; // Assuming authController is exported as default

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;
