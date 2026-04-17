const express = require('express');
const router = express.Router();

const controller = require('../controllers/livrosController');
const auth = require('../middlewares/auth');

router.get('/', controller.getLivros);
router.post('/', auth, controller.createLivro);
router.put('/:id', auth, controller.updateLivro);
router.delete('/:id', auth, controller.deleteLivro);

module.exports = router;

console.log("auth:", typeof auth);
console.log("createLivro:", typeof controller.createLivro);