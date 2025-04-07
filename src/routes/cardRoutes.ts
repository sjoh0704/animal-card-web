// src/routes/cardRoutes.ts
import { Router } from 'express';
import { getCards, updateCard, deleteCard } from '../controllers/cardController';

const router = Router();

router.get('/cards', getCards);
router.post('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;
