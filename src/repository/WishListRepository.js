const CrudRepository = require("./CrudRepository");
const { Wishlist } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class WishListRepository extends CrudRepository {
  constructor() {
    super(Wishlist);
  }

  async getAllProductByUserId(id) {
    try {
      const response = await this.model.findAll({
        where: { user_id: id },
      });

      if (!response || response.length === 0) {
        throw new AppError(
          "No wishlist items found for this user",
          StatusCodes.NOT_FOUND
        );
      }

      return response;
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      if (error instanceof AppError) {
        throw error;
      }

      // Wrap unknown errors
      throw new AppError(
        "Failed to load wishlist",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = WishListRepository;
