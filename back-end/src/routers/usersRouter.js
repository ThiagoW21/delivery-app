const { Router } = require('express');

const usersController = require('../controllers/usersController');

const router = Router();

router.get('/sellers', usersController.getSellers);
router.get('/', usersController.list);

router.post('/admin', usersController.admCreate);
router.post('/', usersController.create);

router.delete('/', usersController.delete);

module.exports = router;