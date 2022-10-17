// Simple express app
const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hello World');
    });
});

app.get('/fast', (req, res) => {
    res.send('Fast response');
});

app.listen(3000);