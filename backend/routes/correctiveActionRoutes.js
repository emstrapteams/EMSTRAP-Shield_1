const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { validateCorrectiveAction } = require("../validation/correctiveActionValidation");
const {
  createCorrectiveAction,
  getCorrectiveActions,
  getCorrectiveActionById,
  updateCorrectiveAction,
  setCorrectiveActionStatus,
  addCorrectiveActionEvidence,
  verifyCorrectiveAction,
} = require("../controllers/correctiveActionController");

const router = express.Router();
router.use(setCompanyContext);

router.get("/", getCorrectiveActions);
router.post("/", validateCorrectiveAction, createCorrectiveAction);
router.get("/:id", getCorrectiveActionById);
router.put("/:id", validateCorrectiveAction, updateCorrectiveAction);
router.patch("/:id/status", setCorrectiveActionStatus);
router.patch("/:id/evidence", addCorrectiveActionEvidence);
router.patch("/:id/verify", verifyCorrectiveAction);

module.exports = router;
