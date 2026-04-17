const db = require('../config/db');

// =======================
// GET TODOS
// =======================
exports.getAutores = (req, res) => {
    try {
        const autores = db.prepare("SELECT * FROM autores").all();
        res.json(autores);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar autores" });
    }
};

// =======================
// CREATE
// =======================
exports.createAutor = (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatório" });
        }

        const result = db.prepare(
            "INSERT INTO autores (nome) VALUES (?)"
        ).run(nome);

        res.status(201).json({
            id: result.lastInsertRowid,
            nome
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar autor" });
    }
};