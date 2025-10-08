const express = require("express");
const router = express.Router();
const DashboardController = require("../controller/dashboard-controller");
const auth = require("../middleware/auth-middleware");

router.get("/", auth("admin"), (req, res, next) =>
  DashboardController.count(req, res, next)
);

module.exports = router;
