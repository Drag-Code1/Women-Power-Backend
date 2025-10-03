const CartItemService = require("../service/cart-item-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const itemServ = new CartItemService();

class CartItemController {
  //1.add new item in cart
  async createNewItem(req, res, next) {
    try {
      const response = await itemServ.addNewInCart(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "item added successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get all cart items
  async getAllCartItems(req, res, next) {
    try {
      const response = await itemServ.getAllCartItems(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All items retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update item
  async updateItemInCart(req, res, next) {
    try {
      const response = await itemServ.updateCartItem(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "item updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete item
  async deleteItem(req, res, next) {
    try {
      const response = await itemServ.deleteCartItem(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "item deleted."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartItemController();
