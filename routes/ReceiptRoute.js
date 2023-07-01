const router = require('express').Router();
const receiptController = require('../controllers/ReceiptController');
const authMiddleWare = require('../middlewares/authMiddleWare');

router.get('/', authMiddleWare, receiptController.getReceipts);
//
router.get('/:monthYear', authMiddleWare, receiptController.getReceipt);
router.get(
  '/filter/:Year',
  authMiddleWare,
  receiptController.getReceiptsByYear
);
//
router.post('/', authMiddleWare, receiptController.createReceipt);

module.exports = router;
