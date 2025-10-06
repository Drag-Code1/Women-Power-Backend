const WishListService = require("../service/wishlist-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const wishServ = new WishListService();

class WishListController {
  //1.add to wishlist
  async addToWishList(req, res, next) {
    try {
      const response = await wishServ.addToWishList(req.body);
      res
        .status(StatusCodes.CREATED)
        .json(success(response, "added to wishlist"));
    } catch (error) {
      next(error);
    }
  }

  //2.delete from wishlist
  async removeFromWishList(req, res, next) {
    try {
      const response = await wishServ.removeFromWishList(req.params.id);
      res
        .status(StatusCodes.OK)
        .json(success(response, "removed from wishlist"));
    } catch (error) {
      next(error);
    }
  }

  //3.get All products in wishlist
  async getAllProductsInWishList(req, res, next) {
    try {
      const response = await wishServ.getAllWishListByUserId(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All products retrived"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WishListController();
