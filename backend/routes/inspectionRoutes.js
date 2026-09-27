const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { validateInspection } = require("../validation/inspectionValidation");
const {
  createInspection,
  getInspections,
  getInspectionById,
  updateInspection,
} = require("../controllers/inspectionController");

const router = express.Router();
router.use(setCompanyContext);

router.get("/", getInspections);
router.post("/", validateInspection, createInspection);
router.get("/:id", getInspectionById);
router.put("/:id", validateInspection, updateInspection);

module.exports = router;
