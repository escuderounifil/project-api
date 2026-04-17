const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    try {
        jwt.verify(token, "segredo");
        next();
    } catch {
        res.status(401).json({ erro: "Token inválido" });
    }
};