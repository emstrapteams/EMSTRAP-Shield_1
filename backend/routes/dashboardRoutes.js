const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { getOverview } = require("../controllers/dashboardController");

const router = express.Router();
// NOTE: aggregation only. No authentication/access-control logic here.
router.use(setCompanyContext);

router.get("/overview", getOverview);

module.exports = router;
