const express = require("express");
const setCompanyContext = require("../middleware/companyContext");
const { validateEquipment } = require("../validation/equipmentValidation");
const {
  createFirstAidKit,
  getFirstAidKits,
  getFirstAidKitById,
  updateFirstAidKit,
  setFirstAidKitStatus,
  updateFirstAidKitContents,
} = require("../controllers/firstAidKitController");

const router = express.Router();
router.use(setCompanyContext);

router.get("/", getFirstAidKits);
router.post("/", validateEquipment, createFirstAidKit);
router.get("/:id", getFirstAidKitById);
router.put("/:id", updateFirstAidKit);
router.patch("/:id/status", setFirstAidKitStatus);
router.patch("/:id/contents", updateFirstAidKitContents);

module.exports = router;
