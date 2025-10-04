const DashboardService = require("../service/dashboard-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const dashboardServ = new DashboardService();

class DashboardController {
  async count(req, res, next) {
    try {
      const response = await dashboardServ.count();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Get's Count."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();