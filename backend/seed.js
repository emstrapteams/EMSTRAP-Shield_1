
// Run with: npm run seed

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Company = require("./models/Company");

const run = async () => {
  await connectDB();

  const existing = await Company.findOne({ code: "DEMOCO" });

  if (existing) {
    console.log("Demo company already exists. Skipping seed.");
    return mongoose.disconnect();
  }

  const company = await Company.create({
    name: "Demo Company Pvt Ltd",
    code: "DEMOCO",
  });

  console.log("Seed complete.");
  console.log("Company:", company.name, company._id.toString());

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});