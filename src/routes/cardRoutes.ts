// src/routes/cardRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { getCards, createOrUpdateCard, deleteCard } from '../controllers/cardController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/cards', getCards);
router.post('/cards/:id', upload.single('image'), createOrUpdateCard);
router.delete('/cards/:id', deleteCard);

export default router;
