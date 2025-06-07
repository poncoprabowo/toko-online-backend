import express from 'express';
import { getOrders, createOrder } from '../controllers/orders.js';

const router = express.Router();

router.get('/:userId', getOrders);
router.post('/', createOrder);

export default router;
