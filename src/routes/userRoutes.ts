import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/user', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;
