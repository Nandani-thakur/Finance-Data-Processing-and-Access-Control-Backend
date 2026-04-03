
// dashboardRoutes.js
const router = require("express").Router();
const { getSummary, getMonthlyTrends } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", protect, authorize("admin", "analyst"), getSummary);


router.get("/monthly-trends", protect, authorize("admin", "analyst"), getMonthlyTrends);

module.exports = router;