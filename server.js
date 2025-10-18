require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/models/index");
const app = express();
const api_routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

app.use(express.json());
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/v1", api_routes);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    //check user cerate Date-time
    // sequelize.sync({ force: true});
    console.log("All models synced.");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
