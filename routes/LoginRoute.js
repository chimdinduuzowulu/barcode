const router = require('express').Router();
const loginController = require('../controllers/LoginController');
const authMiddleWare = require('../middlewares/authMiddleWare');

router.post('/', loginController.createLogin);
router.post('/checkLogin', loginController.checkLogin);
router.post('/updateLogin', authMiddleWare, loginController.updateLogin);

module.exports = router;
