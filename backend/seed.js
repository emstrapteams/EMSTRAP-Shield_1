// Creates one demo company + one Company Admin user so you can log in
// immediately after setup, without calling the register endpoint by hand.
//
// Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Company = require("./models/Company");
const User = require("./models/User");

const run = async () => {
  await connectDB();

  const existing = await Company.findOne({ code: "DEMOCO" });
  if (existing) {
    console.log("Demo company already exists. Skipping seed.");
    return mongoose.disconnect();
  }

  const company = await Company.create({ name: "Demo Company Pvt Ltd", code: "DEMOCO" });

  const admin = await User.create({
    name: "Demo Admin",
    email: "admin@democo.test",
    password: "Password123",
    role: "company_admin",
    company: company._id,
  });

  console.log("Seed complete.");
  console.log("Company:", company.name, company._id.toString());
  console.log("Login with -> email: admin@democo.test | password: Password123");

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
