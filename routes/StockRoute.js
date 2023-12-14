const router = require("express").Router();
const stockController = require("../controllers/StockController");
// const authMiddleWare = require("../middlewares/authMiddleWare");

router.get("/", stockController.getAssets);
//
router.get("/:id", stockController.getAsset);
//
router.post("/", stockController.createAsset);
router.put("/:id", stockController.updateAsset);
router.delete("/:id", stockController.deleteAsset);

module.exports = router;
