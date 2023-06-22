const router = require('express').Router();
const loginController = require('../controllers/LoginController');

router.post('/', loginController.createLogin);
router.post('/checkLogin', loginController.checkLogin);
router.post('/updateLogin', loginController.updateLogin);

module.exports = router;
