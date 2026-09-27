const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const enforceCompanyIsolation = require("../middleware/companyIsolation");
const { validateFacility } = require("../validation/facilityValidation");
const {
  createFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
  setFacilityStatus,
} = require("../controllers/facilityController");

const router = express.Router();

router.use(protect, authorize("company_admin", "super_admin"), enforceCompanyIsolation);

router.get("/", getFacilities);
router.post("/", validateFacility, createFacility);
router.get("/:id", getFacilityById);
router.put("/:id", validateFacility, updateFacility);
router.patch("/:id/status", setFacilityStatus);

module.exports = router;
