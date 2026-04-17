const express = require('express');
const app = express();

const livrosRoutes = require('./routes/livrosRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/livros', livrosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});

module.exports = app;