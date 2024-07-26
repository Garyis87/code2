const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

let games = [
    { id: 1, name: 'Game 1', url: './1-FruitNinja/fruit.html', likes: 0, comments: [] },
    { id: 2, name: 'Game 2', url: 'https://www.ha365.com/games/subway-surfers-2', likes: 0, comments: [] },
    { id: 3, name: 'Game 3', url: 'https://kuioo.tw/g/play/Highway-Racer-3D/', likes: 0, comments: [] },
    { id: 4, name: 'Game 4', url: 'https://gamekuo.com/html5/4425', likes: 0, comments: [] },
    { id: 5, name: 'Game 5', url: 'https://shellshock.io', likes: 0, comments: [] },
    { id: 6, name: 'Game 6', url: 'https://krunker.io/?game=TOK:owcrh', likes: 0, comments: [] },
    { id: 7, name: 'Game 7', url: '', likes: 0, comments: [] },
    { id: 8, name: 'Game 8', url: '', likes: 0, comments: [] },
    { id: 9, name: 'Game 9', url: '', likes: 0, comments: [] },
    { id: 10, name: 'Game 10', url: '', likes: 0, comments: [] }
];

app.get('/games', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    res.json(games.slice(start, end));
});

app.post('/like', (req, res) => {
    const { gameId } = req.body;
    const game = games.find(g => `game-${g.id}` === gameId);
    if (game) {
        game.likes++;
        res.json({ status: 'success', message: `Like recorded for ${gameId}` });
    } else {
        res.status(404).json({ status: 'error', message: 'Game not found' });
    }
});

app.post('/comment', (req, res) => {
    const { gameId, comment } = req.body;
    const game = games.find(g => `game-${g.id}` === gameId);
    if (game) {
        game.comments.push(comment);
        res.json({ status: 'success', message: `Comment recorded for ${gameId}` });
    } else {
        res.status(404).json({ status: 'error', message: 'Game not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
