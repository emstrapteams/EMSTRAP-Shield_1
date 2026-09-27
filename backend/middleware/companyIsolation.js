const { fail } = require("../utils/apiResponse");

/**
 * Enforces company-level data isolation.
 *
 * - company_admin: req.companyId is forced to their own company. Any
 *   companyId supplied in the query/body is ignored, so it is not possible
 *   to read or write another company's data by passing a different ID.
 * - super_admin: may optionally target a specific company via ?companyId=,
 *   used for platform-level administration (e.g. Super Admin dashboards).
 *
 * Every controller in Employee/Department/Facility (and later modules)
 * MUST filter/create using req.companyId rather than trusting client input.
 */
const enforceCompanyIsolation = (req, res, next) => {
  if (!req.user) {
    return fail(res, 401, "Not authenticated.");
  }

  if (req.user.role === "company_admin") {
    if (!req.user.company) {
      return fail(res, 403, "Account is not associated with a company.");
    }
    req.companyId = req.user.company.toString();
    return next();
  }

  if (req.user.role === "super_admin") {
    // Super admin may act platform-wide, or scope to one company explicitly.
    req.companyId = req.query.companyId || req.body.company || null;
    return next();
  }

  return fail(res, 403, "Forbidden.");
};

module.exports = enforceCompanyIsolation;
