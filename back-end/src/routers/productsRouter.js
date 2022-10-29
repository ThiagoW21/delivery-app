const { Router } = require('express');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', authMiddleware, productsController.getAll);

module.exports = router;
