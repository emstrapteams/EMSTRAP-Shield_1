const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, fail } = require("../utils/apiResponse");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, 400, "Email and password are required.");

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || user.status !== "active") return fail(res, 401, "Invalid credentials.");

  const matches = await user.comparePassword(password);
  if (!matches) return fail(res, 401, "Invalid credentials.");

  const token = signToken(user);
  return ok(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
    },
  });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  return ok(res, {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    company: req.user.company,
  });
});

// POST /api/auth/register-company-admin
// Convenience endpoint used during initial setup / demos to create a
// Company + its first Company Admin in one call. In production this would
// typically be restricted to Super Admin (see Section 22 of the spec).
const registerCompanyWithAdmin = asyncHandler(async (req, res) => {
  const { companyName, companyCode, adminName, adminEmail, adminPassword } = req.body;

  if (!companyName || !companyCode || !adminName || !adminEmail || !adminPassword) {
    return fail(res, 400, "companyName, companyCode, adminName, adminEmail, adminPassword are all required.");
  }

  const company = await Company.create({ name: companyName, code: companyCode });
  const admin = await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "company_admin",
    company: company._id,
  });

  return created(res, {
    company,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
});

module.exports = { login, me, registerCompanyWithAdmin };
