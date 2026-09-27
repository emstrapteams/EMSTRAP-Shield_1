require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const fireExtinguisherRoutes = require("./routes/fireExtinguisherRoutes");
const firstAidKitRoutes = require("./routes/firstAidKitRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");
const correctiveActionRoutes = require("./routes/correctiveActionRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ success: true, message: "Shield API is running." }));
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/fire-extinguishers", fireExtinguisherRoutes);
app.use("/api/first-aid-kits", firstAidKitRoutes);
app.use("/api/inspections", inspectionRoutes);
app.use("/api/corrective-actions", correctiveActionRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[Shield API] Listening on port ${PORT}`));
