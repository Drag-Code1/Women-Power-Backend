const CrudRepository = require("./CrudRepository");
const db = require("../models");
const CartItem = db.CartItem;
const Product = db.Product;
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class CartItemRepository extends CrudRepository {
  constructor() {
    super(CartItem);
  }

  async getAllCartItems(cartId) {
    try {
      const response = await this.model.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            attributes: ["id", "p_Name", "thumbnail", "price", "discount"],
          },
        ],
        attributes: ["id", "quantity"],
      });

      const formatted = response.map((item) => ({
        id: item.id,
        product: item.Product,
        quantity: item.quantity,
      }));

      return formatted;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw new AppError(
        "Failed to load items",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CartItemRepository;
