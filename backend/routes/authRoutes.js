const express = require("express");
const { login, me, registerCompanyWithAdmin } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register-company-admin", registerCompanyWithAdmin);
router.get("/me", protect, me);

module.exports = router;
