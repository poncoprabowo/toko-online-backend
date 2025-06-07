import express from 'express';
import {
  getUserById,
  registerUser,
  updateUser
} from '../controllers/users.js';

const router = express.Router();

router.get('/:id', getUserById);
router.post('/', registerUser);
router.put('/:id', updateUser);

export default router;
