const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // login fake (pra teste)
    if (usuario === "admin" && senha === "123") {
        const token = jwt.sign(
            { usuario },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    }

    return res.status(401).json({ erro: "Credenciais inválidas" });
});

module.exports = router;