import express from 'express';
import { getCartItems, addCartItem, deleteCartItem } from '../controllers/cart.js';

const router = express.Router();

router.get('/:userId', getCartItems);
router.post('/', addCartItem);
router.delete('/:id', deleteCartItem);

export default router;
