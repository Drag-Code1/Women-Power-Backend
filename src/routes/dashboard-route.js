const express = require("express");
const router = express.Router();
const DashboardController = require("../controller/dashboard-controller");

router.get("/", (req, res, next) =>
  DashboardController.count(req, res, next)
);

module.exports = router;
