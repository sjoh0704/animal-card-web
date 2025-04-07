// src/controllers/cardController.ts
import { Request, Response } from 'express';

export interface Card {
    id: number;
    maker: string;
    name: string;
    features: string;
    image: string | null;
}

// 0~31번 카드(총 30개)를 위한 배열. 초기엔 null로 처리
const cards: (Card | null)[] = [
    { id: 0, maker: "신지원", name: "", features: "", image: null },
    { id: 1, maker: "경라희", name: "", features: "", image: null },
    { id: 2, maker: "권두연", name: "", features: "", image: null },
    { id: 3, maker: "권민", name: "", features: "", image: null },
    { id: 4, maker: "권서우", name: "", features: "", image: null },
    { id: 5, maker: "권예준", name: "", features: "", image: null },
    { id: 6, maker: "김도현", name: "", features: "", image: null },
    { id: 7, maker: "김주아", name: "", features: "", image: null },
    { id: 8, maker: "노한별", name: "", features: "", image: null },
    { id: 9, maker: "방찬솔", name: "", features: "", image: null },
    { id: 10, maker: "신도준", name: "", features: "", image: null },
    { id: 11, maker: "연지후", name: "", features: "", image: null },
    { id: 12, maker: "오규진", name: "", features: "", image: null },
    { id: 13, maker: "윤도진", name: "", features: "", image: null },
    { id: 14, maker: "이다인", name: "", features: "", image: null },
    { id: 15, maker: "이동규", name: "", features: "", image: null },
    { id: 16, maker: "이동하", name: "", features: "", image: null },
    { id: 17, maker: "이석현", name: "", features: "", image: null },
    { id: 18, maker: "이아린", name: "", features: "", image: null },
    { id: 19, maker: "임현웅", name: "", features: "", image: null },
    { id: 20, maker: "장아윤", name: "", features: "", image: null },
    { id: 21, maker: "정차이", name: "", features: "", image: null },
    { id: 22, maker: "정채연", name: "", features: "", image: null },
    { id: 23, maker: "지윤정", name: "", features: "", image: null },
    { id: 24, maker: "황채영", name: "", features: "", image: null },
    { id: 25, maker: "없음", name: "", features: "", image: null },
    { id: 26, maker: "없음", name: "", features: "", image: null },
    { id: 27, maker: "없음", name: "", features: "", image: null },
    { id: 28, maker: "없음", name: "", features: "", image: null },
    { id: 29, maker: "없음", name: "", features: "", image: null },
    { id: 30, maker: "없음", name: "", features: "", image: null },
];

export const getCards = (req: Request, res: Response): void => {
    const result = cards.map(card => {
        if (card) {
            return card;
        }
        return null;
    });
    res.json(result);
};

export const updateCard = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    if (id < 0 || id >= 30) {
        res.status(400).json({ message: '카드 id는 0부터 31 사이여야 합니다.' });
        return;
    }
    const { maker, name, features, image } = req.body;
    const updatedCard: Card = { id, maker, name, features, image: image };
    cards[id] = updatedCard;
    res.json(updatedCard);
};

export const deleteCard = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    if (id < 0 || id >= 30) {
        res.status(400).json({ message: '카드 id는 0부터 31 사이여야 합니다.' });
        return;
    }
    cards[id] = {
        id: id,
        maker: cards[id]?.maker || "",
        name: "",
        features: "",
        image: null
    }
    res.json({ message: `카드 ${id}가 삭제되었습니다.` });
};
