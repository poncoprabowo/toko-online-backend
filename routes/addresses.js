import express from 'express';
import { getAddresses, addAddress, deleteAddress } from '../controllers/addresses.js';

const router = express.Router();

router.get('/:userId', getAddresses);
router.post('/', addAddress);
router.delete('/:id', deleteAddress);

export default router;
