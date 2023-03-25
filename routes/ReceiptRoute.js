const router = require('express').Router();
const receiptController = require('../controllers/ReceiptController');

router.get('/',receiptController.getReceipts);
// 
router.get('/:receiptId',receiptController.getReceipt);
// 
router.post('/',receiptController.createReceipt);

module.exports = router;