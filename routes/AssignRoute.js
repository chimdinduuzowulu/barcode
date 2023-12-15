const router = require("express").Router();
const assignontroller = require("../controllers/AssignController");
// const authMiddleWare = require("../middlewares/authMiddleWare");

router.get("/", assignontroller.getAllAssigned);
//
router.get("/:id", assignontroller.getAsigned);
//
router.post("/", assignontroller.assignAsset);
router.put("/:id", assignontroller.updateAssigned);
router.delete("/:AssignedID", assignontroller.deleteAssigned);

module.exports = router;
