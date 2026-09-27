const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const enforceCompanyIsolation = require("../middleware/companyIsolation");
const { validateDepartment } = require("../validation/departmentValidation");
const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  setDepartmentStatus,
  getDepartmentEmployees,
} = require("../controllers/departmentController");

const router = express.Router();

router.use(protect, authorize("company_admin", "super_admin"), enforceCompanyIsolation);

router.get("/", getDepartments);
router.post("/", validateDepartment, createDepartment);
router.get("/:id", getDepartmentById);
router.put("/:id", validateDepartment, updateDepartment);
router.patch("/:id/status", setDepartmentStatus);
router.get("/:id/employees", getDepartmentEmployees);

module.exports = router;
