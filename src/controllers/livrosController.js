const db = require('../config/db');

// =======================
// GET TODOS (filtros + paginação + ordenação)
// =======================
exports.getLivros = (req, res) => {
    try {
        const { genero, autor, page = 1, limit = 5, sort = "livros.id" } = req.query;

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

        query += ` ORDER BY ${sort} LIMIT ? OFFSET ?`;
        params.push(limit, (page - 1) * limit);

        const rows = db.prepare(query).all(...params);

        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
};

// =======================
// GET POR ID
// =======================
exports.getLivroById = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const livro = db.prepare(`
            SELECT livros.*, autores.nome as autor
            FROM livros
            JOIN autores ON livros.autor_id = autores.id
            WHERE livros.id = ?
        `).get(id);

        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.status(200).json(livro);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar livro" });
    }
};

// =======================
// CREATE
// =======================
exports.createLivro = (req, res) => {
    try {
        const { titulo, genero, ano, autor_id } = req.body;

        if (!titulo || !autor_id) {
            return res.status(400).json({ erro: "Título e autor_id são obrigatórios" });
        }

        const result = db.prepare(`
            INSERT INTO livros (titulo, genero, ano, autor_id)
            VALUES (?, ?, ?, ?)
        `).run(titulo, genero || null, ano || null, autor_id);

        res.status(201).json({
            id: result.lastInsertRowid,
            titulo,
            genero,
            ano,
            autor_id
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar livro" });
    }
};

// =======================
// UPDATE
// =======================
exports.updateLivro = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const { titulo, genero, ano, autor_id } = req.body;

        const result = db.prepare(`
            UPDATE livros
            SET titulo=?, genero=?, ano=?, autor_id=?
            WHERE id=?
        `).run(titulo, genero, ano, autor_id, id);

        if (result.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.status(200).json({ mensagem: "Livro atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar livro" });
    }
};

// =======================
// DELETE
// =======================
exports.deleteLivro = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const result = db.prepare(`
            DELETE FROM livros WHERE id=?
        `).run(id);

        if (result.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.status(200).json({ mensagem: "Livro removido com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao deletar livro" });
    }
};