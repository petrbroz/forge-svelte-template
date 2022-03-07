const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const { getPublicToken, listModels } = require('./services/forge.js');

let app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/api/auth/token', async (req, res, next) => {
    try {
        res.json(await getPublicToken());
    } catch (err) {
        next(err);
    }
});
app.get('/api/models', async (req, res, next) => {
    try {
        res.json(await listModels());
    } catch (err) {
        next(err);
    }
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
