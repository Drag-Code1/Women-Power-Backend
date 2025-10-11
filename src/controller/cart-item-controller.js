const CartItemService = require("../service/cart-item-service");
const { StatusCodes } = require("http-status-codes");
const { Cart } = require("../models");
const success = require("../utils/success/success-response");
const AppError = require("../utils/errors/AppError");

const itemServ = new CartItemService();

class CartItemController {
  // 1. Add new item to cart
  async createNewItem(req, res, next) {
    try {
      const { userId, productId, quantity } = req.body;

      const cart = await Cart.findOne({ where: { userId: userId } });
      if (!cart) {
        throw new AppError(
          "Cart not found for this user",
          StatusCodes.NOT_FOUND
        );
      }

      const data = {
        cartId: cart.id,
        productId,
        quantity,
      };

      const response = await itemServ.addNewInCart(data);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Item added successfully"));
    } catch (error) {
      next(error);
    }
  }

  // 2. Get all cart items by userId
  async getAllCartItems(req, res, next) {
    try {
      const userId = req.params.id;

      const cart = await Cart.findOne({ where: { userId: userId } });
      if (!cart) {
        throw new AppError(
          "Cart not found for this user",
          StatusCodes.NOT_FOUND
        );
      }

      const response = await itemServ.getAllCartItems(cart.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All items retrieved"));
    } catch (error) {
      next(error);
    }
  }

  //3.update item
  async updateItemInCart(req, res, next) {
    try {
      const response = await itemServ.updateCartItem(req.params.id, req.body);
      return res.status(StatusCodes.OK).json(success(response, "item updated"));
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
