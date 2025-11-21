const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", taskController.create);
router.get("/:userId", taskController.list);
router.put("/:id", taskController.updateStatus);
router.delete("/:id", taskController.delete);

module.exports = router;
