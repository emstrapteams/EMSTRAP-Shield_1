const mongoose = require("mongoose");

/**
 * Reusable inspection record for ANY equipment type (fire extinguishers,
 * first-aid kits, fire alarms, emergency exits, emergency lights, etc.).
 *
 * The checklist is fully configurable per-inspection — items are supplied
 * by the caller (frontend can source a template per equipment type), not
 * hardcoded here. The overall result is derived from checklist item
 * results, per the "overall result should be derived appropriately from
 * the checklist/result information" requirement.
 */

const ITEM_RESULTS = ["pass", "fail", "needs_attention", "not_applicable"];
const OVERALL_RESULTS = ["passed", "failed", "needs_attention"];

const checklistItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true, trim: true },
    result: { type: String, enum: ITEM_RESULTS, required: true },
    notes: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const inspectionSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true, index: true },

    inspector: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
    inspectorName: { type: String, trim: true, default: "" }, // fallback if inspector isn't a system Employee

    inspectionDate: { type: Date, required: true, default: Date.now },

    checklist: {
      type: [checklistItemSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one checklist item is required.",
      },
    },

    // Derived automatically from checklist results (see pre-save hook),
    // but stored so it can be filtered/sorted/reported on directly.
    result: { type: String, enum: OVERALL_RESULTS },

    notes: { type: String, trim: true, default: "" },
    photos: [{ type: String, trim: true }],

    nextInspectionDate: { type: Date },
  },
  { timestamps: true }
);

// Derive the overall result: any 'fail' -> failed; else any
// 'needs_attention' -> needs_attention; else passed.
inspectionSchema.pre("validate", function (next) {
  const results = (this.checklist || []).map((c) => c.result);
  if (results.includes("fail")) this.result = "failed";
  else if (results.includes("needs_attention")) this.result = "needs_attention";
  else this.result = "passed";
  next();
});

inspectionSchema.statics.ITEM_RESULTS = ITEM_RESULTS;
inspectionSchema.statics.OVERALL_RESULTS = OVERALL_RESULTS;

module.exports = mongoose.model("Inspection", inspectionSchema);
