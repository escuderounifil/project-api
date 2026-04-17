const express = require('express');
const router = express.Router();

const controller = require('../controllers/autoresController');
const auth = require('../middlewares/auth');

router.get('/', controller.getAutores);
router.post('/', auth, controller.createAutor);

module.exports = router;