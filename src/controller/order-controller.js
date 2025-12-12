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

  //2.get orders by userId
  async getOrders(req, res, next) {
    try {
      const response = await orderServ.getOrders(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All orders retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.get all orders
  async getAllOrders(req, res, next) {
    try {
      const response = await orderServ.getAllOrders();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All orders retrived"));
    } catch (error) {
      next(error);
    }
  }

  //4. cancel order
  async cancelOrder(req, res, next) {
    try {
      const response = await orderServ.cancelOrder(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Order cancelled successfully"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
