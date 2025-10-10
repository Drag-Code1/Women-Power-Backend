const { StatusCodes } = require("http-status-codes");
const { Product } = require("../models");
const AppError = require("../utils/errors/AppError");
const CrudRepository = require("./CrudRepository");
const { Op } = require("sequelize");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  async getAllProducts(page, limit, userId = null) {
    const offset = (page - 1) * limit;
    try {
      const attributes = [
        "id",
        "p_Name",
        "thumbnail",
        "category_id",
        "price",
        "discount",
        "isTrending",
      ];

      if (userId) {
        attributes.push([
          this.model.sequelize.literal(`
          EXISTS (
            SELECT 1 
            FROM wish_list w 
            WHERE w.product_id = Product.id 
              AND w.user_id = '${userId}'
          )
        `),
          "is_in_wishlist",
        ]);
      } else {
        // For guests → always false
        attributes.push([
          this.model.sequelize.literal(`FALSE`),
          "is_in_wishlist",
        ]);
      }

      const { count, rows } = await this.model.findAndCountAll({
        attributes,
        offset,
        limit,
      });

      return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows.map((p) => ({
          ...p.toJSON(),
          is_in_wishlist: Boolean(p.getDataValue("is_in_wishlist")),
        })),
      };
    } catch (error) {
      throw new AppError(
        "Fail to fetch all products.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async countAll() {
    try {
      const count = await this.model.count();
      return count;
    } catch (error) {
      throw new AppError("Could not count.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllByCatgId(id) {
    try {
      const response = await this.model.findAll({
        where: { category_id: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch products by category",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async searchByName(name) {
    try {
      return await this.model.findAll({
        where: {
          [Op.or]: [
            { p_Name: { [Op.like]: `%${name}%` } },
            { description: { [Op.like]: `%${name}%` } },
          ],
        },
      });
    } catch (error) {
      throw new AppError(
        "Failed to search products by name or description",
        500
      );
    }
  }

  async getTrendingP() {
    try {
      const response = await this.model.findAll({
        where: { isTrending: true },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch tranding products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getProdutsByArtistId(id) {
    try {
      const response = await this.model.findAll({
        where: { artist_id: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch Artist products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBestSellerProducts(userId = null, limit = 12) {
    try {
      const attributes = [
        "id",
        "p_Name",
        "thumbnail",
        "category_id",
        "price",
        "discount",
        "isTrending",
      ];

      if (userId) {
        attributes.push([
          this.model.sequelize.literal(`
          EXISTS (
            SELECT 1 
            FROM wish_list w 
            WHERE w.product_id = Product.id 
              AND w.user_id = '${userId}'
          )
        `),
          "is_in_wishlist",
        ]);
      } else {
        attributes.push([
          this.model.sequelize.literal("FALSE"),
          "is_in_wishlist",
        ]);
      }

      const products = await this.model.findAll({
        order: [["sell_count", "DESC"]],
        limit,
        attributes,
      });

      // Ensure is_in_wishlist is boolean
      return products.map((p) => ({
        ...p.toJSON(),
        is_in_wishlist: Boolean(p.getDataValue("is_in_wishlist")),
      }));
    } catch (error) {
      throw new AppError(
        "Failed to fetch best seller products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ProductRepository;
