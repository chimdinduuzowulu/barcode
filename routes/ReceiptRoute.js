const router = require('express').Router();
const receiptController = require('../controllers/ReceiptController');

router.get('/',receiptController.getReceipts);
// 
router.get('/:monthYear',receiptController.getReceipt);
router.get('/filter/:Year',receiptController.getReceiptsByYear);
// 
router.post('/',receiptController.createReceipt);

module.exports = router;