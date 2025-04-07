// src/controllers/cardController.ts
import { Request, Response } from 'express';
import { Multer } from 'multer';

interface ImageData {
    data: string;
    mimetype: string;
}

export interface Card {
    id: number;
    maker: string;
    name: string;
    features: string;
    image?: ImageData;
}

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// 0~31번 카드(총 30개)를 위한 배열. 초기엔 null로 처리
const cards: (Card | null)[] = new Array(30).fill(null);

export const getCards = (req: Request, res: Response): void => {
    const result = cards.map(card => {
        if (card) {
            return card;
        }
        return null;
    });
    res.json(result);
};

export const createOrUpdateCard = (req: MulterRequest, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    if (id < 0 || id >= 30) {
        res.status(400).json({ message: '카드 id는 0부터 31 사이여야 합니다.' });
        return;
    }
    const { maker, name, features } = req.body;
    let image;
    if (req.file) {
        image = {
            data: `data:${req.file.mimetype};base64,` + req.file.buffer.toString('base64'),
            mimetype: req.file.mimetype
        };
    }
    const updatedCard: Card = { id, maker, name, features, image };
    cards[id] = updatedCard;
    res.json(updatedCard);
};

export const deleteCard = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    if (id < 0 || id >= 30) {
        res.status(400).json({ message: '카드 id는 0부터 31 사이여야 합니다.' });
        return;
    }
    cards[id] = null;
    res.json({ message: `카드 ${id}가 삭제되었습니다.` });
};
