const express = require('express');
const app = express();

const livrosRoutes = require('./routes/livrosRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/livros', livrosRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});

module.exports = app;