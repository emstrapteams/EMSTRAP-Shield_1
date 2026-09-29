const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { getStats } = require("../controllers/trainingDashboardController");

const router = express.Router();
router.use(setCompanyContext);

router.get("/stats", getStats);

module.exports = router;
