const db = require('../config/db');

// =======================
// GET TODOS (com filtro/paginação)
// =======================
exports.getLivros = (req, res) => {
    const { genero, autor, page = 1, limit = 5 } = req.query;

    let query = `
        SELECT livros.*, autores.nome as autor
        FROM livros
        JOIN autores ON livros.autor_id = autores.id
        WHERE 1=1
    `;

    const params = [];

    if (genero) {
        query += " AND genero = ?";
        params.push(genero);
    }

    if (autor) {
        query += " AND autores.nome LIKE ?";
        params.push(`%${autor}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, (page - 1) * limit);

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// =======================
// GET POR ID
// =======================
exports.getLivroById = (req, res) => {
    const id = parseInt(req.params.id);

    db.get(
        `SELECT livros.*, autores.nome as autor
         FROM livros
         JOIN autores ON livros.autor_id = autores.id
         WHERE livros.id = ?`,
        [id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            if (!row) return res.status(404).json({ erro: "Livro não encontrado" });
            res.json(row);
        }
    );
};

// =======================
// CREATE
// =======================
exports.createLivro = (req, res) => {
    const { titulo, genero, ano, autor_id } = req.body;

    if (!titulo || !autor_id) {
        return res.status(400).json({ erro: "Título e autor_id são obrigatórios" });
    }

    db.run(
        `INSERT INTO livros (titulo, genero, ano, autor_id) VALUES (?, ?, ?, ?)`,
        [titulo, genero, ano, autor_id],
        function (err) {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                id: this.lastID,
                titulo,
                genero,
                ano,
                autor_id
            });
        }
    );
};

// =======================
// UPDATE
// =======================
exports.updateLivro = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, genero, ano, autor_id } = req.body;

    db.run(
        `UPDATE livros SET titulo=?, genero=?, ano=?, autor_id=? WHERE id=?`,
        [titulo, genero, ano, autor_id, id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }

            res.json({ mensagem: "Atualizado com sucesso" });
        }
    );
};

// =======================
// DELETE
// =======================
exports.deleteLivro = (req, res) => {
    const id = parseInt(req.params.id);

    db.run(`DELETE FROM livros WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json(err);
        if (this.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json({ mensagem: "Removido com sucesso" });
    });
};