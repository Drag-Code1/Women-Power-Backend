const OrderService = require("../service/order-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const orderServ = new OrderService();

class OrderController {
  //1.Add new order
  async newOrder(req, res, next) {
    try {
      const response = await orderServ.addNewOrder(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "order added."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
