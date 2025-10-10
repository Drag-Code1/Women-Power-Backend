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
        attributes: ["id", "user_id"], // only wishlist info
        include: [
          {
            model: this.model.sequelize.models.Product,
            as: "Product",
            attributes: [
              "id",
              "p_Name",
              "thumbnail",
              "category_id",
              "price",
              "discount",
              "isTrending",
            ],
          },
        ],
      });

      if (!response || response.length === 0) {
        throw new AppError(
          "No wishlist items found for this user",
          StatusCodes.NOT_FOUND
        );
      }

      // Format response and add is_in_wishlist flag
      const formatted = response.map((item) => ({
        id: item.id,
        user_id: item.user_id,
        product: {
          ...item.Product.toJSON(),
          is_in_wishlist: true, // ✅ add this flag manually
        },
      }));

      return formatted;
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Failed to load wishlist",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = WishListRepository;
