// src/controllers/cardController.ts
import { Request, Response } from 'express';

interface ImageData {
    data: string;
    name: string; // Changed to store image name instead of mimetype
}

export interface Card {
    id: number;
    maker: string;
    name: string;
    features: string;
    image?: ImageData;
}

// 0~31번 카드(총 30개)를 위한 배열. 초기엔 null로 처리
const cards: (Card | null)[] = [
    { id: 0, maker: "신지원", name: "", features: "" },
    { id: 1, maker: "경라희", name: "", features: "" },
    { id: 2, maker: "권두연", name: "", features: "" },
    { id: 3, maker: "권민", name: "", features: "" },
    { id: 4, maker: "권서우", name: "", features: "" },
    { id: 5, maker: "권예준", name: "", features: "" },
    { id: 6, maker: "김도현", name: "", features: "" },
    { id: 7, maker: "김주아", name: "", features: "" },
    { id: 8, maker: "노한별", name: "", features: "" },
    { id: 9, maker: "방찬솔", name: "", features: "" },
    { id: 10, maker: "신도준", name: "", features: "" },
    { id: 11, maker: "연지후", name: "", features: "" },
    { id: 12, maker: "오규진", name: "", features: "" },
    { id: 13, maker: "윤도진", name: "", features: "" },
    { id: 14, maker: "이다인", name: "", features: "" },
    { id: 15, maker: "이동규", name: "", features: "" },
    { id: 16, maker: "이동하", name: "", features: "" },
    { id: 17, maker: "이석현", name: "", features: "" },
    { id: 18, maker: "이아린", name: "", features: "" },
    { id: 19, maker: "임현웅", name: "", features: "" },
    { id: 20, maker: "장아윤", name: "", features: "" },
    { id: 21, maker: "정차이", name: "", features: "" },
    { id: 22, maker: "정채연", name: "", features: "" },
    { id: 23, maker: "지윤정", name: "", features: "" },
    { id: 24, maker: "황채영", name: "", features: "" },
    { id: 25, maker: "", name: "", features: "" },
    { id: 26, maker: "", name: "", features: "" },
    { id: 27, maker: "", name: "", features: "" },
    { id: 28, maker: "", name: "", features: "" },
    { id: 29, maker: "", name: "", features: "" },
    { id: 30, maker: "", name: "", features: "" },
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

export const createOrUpdateCard = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    if (id < 0 || id >= 30) {
        res.status(400).json({ message: '카드 id는 0부터 31 사이여야 합니다.' });
        return;
    }
    const { maker, name, features, image: imageName } = req.body;

    let image;
    if (imageName) {
        image = {
            data: `/animals/${imageName}.jpg`, // Assuming images are stored as jpg in public/images
            name: imageName
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
    cards[id] = {
        id: id,
        maker: cards[id]?.maker || "",
        name: "",
        features: ""
    }
    res.json({ message: `카드 ${id}가 삭제되었습니다.` });
};
