const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { fail } = require("../utils/apiResponse");

// Verifies the JWT and attaches the authenticated user to req.user.
// This is the first gate: unauthenticated requests never reach a controller.
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return fail(res, 401, "Not authenticated. Missing bearer token.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.status !== "active") {
      return fail(res, 401, "Not authenticated. User not found or inactive.");
    }

    req.user = user;
    next();
  } catch (err) {
    return fail(res, 401, "Not authenticated. Invalid or expired token.");
  }
};

// Restricts a route to specific roles, e.g. authorize("super_admin").
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return fail(res, 403, "Forbidden. You do not have access to this resource.");
  }
  next();
};

module.exports = { protect, authorize };
