const CartItemRepository = require("../repository/CartItemRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class CartItemService {
  constructor() {
    this.itemRepo = new CartItemRepository();
  }

  //1.Add new item in cart
  async addNewInCart(data) {
    try {
      const response = await this.itemRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to add in cart",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All cart items by cartId
  async getAllCartItems(cartID) {
    try {
      const response = await this.itemRepo.getAllCartItems(cartID);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch cart items",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update cart item
  async updateCartItem(id, data) {
    try {
      const response = await this.itemRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update cart item",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete cart item
  async deleteCartItem(id) {
    try {
      const response = await this.itemRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartItemService ;
