const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { validateEquipment } = require("../validation/equipmentValidation");
const {
  createFireExtinguisher,
  getFireExtinguishers,
  getFireExtinguisherSummary,
  getFireExtinguisherById,
  updateFireExtinguisher,
  setFireExtinguisherStatus,
} = require("../controllers/fireExtinguisherController");

const router = express.Router();
router.use(setCompanyContext);

router.get("/", getFireExtinguishers);
router.post("/", validateEquipment, createFireExtinguisher);
router.get("/summary", getFireExtinguisherSummary);
router.get("/:id", getFireExtinguisherById);
router.put("/:id", updateFireExtinguisher);
router.patch("/:id/status", setFireExtinguisherStatus);

module.exports = router;
