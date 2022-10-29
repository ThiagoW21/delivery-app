const { Router } = require('express');
const salesController = require('../controllers/salesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);
router.get('/', salesController.list);
router.get('/:id', salesController.getDetails);
router.patch('/:id', salesController.update);
router.post('/', salesController.create);

module.exports = router;
