const Database = require('better-sqlite3');

const db = new Database('database.sqlite');

// Criar tabelas
db.exec(`
CREATE TABLE IF NOT EXISTS autores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT,
    ano INTEGER,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
);
`);

module.exports = db;