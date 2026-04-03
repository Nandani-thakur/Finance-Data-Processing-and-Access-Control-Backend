// recordRoutes.js
const router = require("express").Router();
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
router.get("/", protect, authorize("admin", "analyst", "viewer"), getRecords);
router.post("/", protect, authorize("admin"), createRecord);

router.put("/:id", protect, authorize("admin"), updateRecord);
router.delete("/:id", protect, authorize("admin"), deleteRecord);

module.exports = router;