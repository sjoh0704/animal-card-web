// src/index.ts
import express from 'express';
import path from 'path';
import fs from 'fs';
import cardRoutes from './routes/cardRoutes';

const app = express();
const port = process.env.PORT || 3000;

// JSON과 URL-encoded 데이터 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public 폴더의 정적 파일 제공
app.use(express.static(path.join(__dirname, '..', 'public')));

// API 라우트 등록 (예: /api/cards 등)
app.use('/api', cardRoutes);

// 루트 경로에 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// images 파일
app.get('/animals/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'public', 'animals', filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404)
    }
});

app.get('/animals', (req, res) => {
    const animals = fs.readdirSync(path.join(__dirname, '..', 'public', 'animals'));
    res.json(animals);
});


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
