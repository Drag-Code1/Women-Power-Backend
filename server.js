require("dotenv").config();
const express = require("express");
const { sequelize, User } = require("./src/models"); // Import User model
const api_routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// API routes
app.use("/v1", api_routes);

// Error handler
app.use(errorHandler);

(async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log("✅ Database connected...");


    await sequelize.sync(); 
    console.log("✅ All models synced.");

    // ---- CREATE DEFAULT ADMIN (ONLY ONCE) ----
    const adminEmail ="abhishinde5458@gmail.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      // Create admin only if not exists
      await User.create({
        firstName: "abhishek",
        lastName: "shinde",
        gender: "male",
        email: "abhishinde5458@gmail.com",
        mobileNo: "7385331672",
        role: "admin",
      });

      console.log("👑 Admin user created successfully!");
    } else {
      console.log("✅ Admin user already exists, skipping creation.");
    }

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("🚀 Server running on port ${PORT}");
    });

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();