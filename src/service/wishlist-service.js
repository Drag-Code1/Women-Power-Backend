const WishListRepo = require("../repository/WishListRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class WishListService {
  constructor() {
    this.wishRepo = new WishListRepo();
  }

  //1.add to wishList
  async addToWishList(data) {
    try {
      const response = await this.wishRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "fail to add in wish list",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.remove from wishList
  async removeFromWishList(id) {
    try {
      const response = await this.wishRepo.destroy(id);
      return response;
    } catch (error) {
      throw new AppError(
        "fail to remove from wish list",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.get all by userID
  async getAllWishListByUserId(id) {
    try {
      const response = await this.wishRepo.getAllProductByUserId(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WishListService;
