const ProductService = require("../service/product-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const productServ = new ProductService();

class ProductController {
  //1.add new product
  async createProduct(req, res, next) {
    try {
      const response = await productServ.createProduct(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Product added successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All products
  async getAllProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page);
      const userId = req.user ? req.user.id : null;
      const response = await productServ.getAllProducts(page, userId);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All products retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.get Product details by id
  async getProductDetails(req, res, next) {
    try {
      const response = await productServ.getProductById(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Product details"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateProduct(req, res, next) {
    try {
      const response = await productServ.updateProduct(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Product updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteProduct(req, res, next) {
    try {
      const response = await productServ.deleteProduct(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  //5.get All products by filter
  async getProductsFilter(req, res, next) {
    try {
      const response = await productServ.getProductsFilter(req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All filtered products retrived"));
    } catch (error) {
      next(error);
    }
  }

  //6.search Products
  async searchProducts(req, res, next) {
    try {
      const response = await productServ.searchProducts(req.params.search);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  //7.get trendin products
  async getTrendingProducts(req, res, next) {
    try {
      const response = await productServ.getTrandingProducts();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "trnding products"));
    } catch (error) {
      next(error);
    }
  }

  //8.get products by catg id
  async getProductsByCatgId(req, res, next) {
    try {
      const response = await productServ.getProductsByCatgId(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Related products"));
    } catch (error) {
      next(error);
    }
  }

  async getArtistProducts(req, res, next) {
    try {
      const response = await productServ.getProductsByArtistId(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Artist Related products"));
    } catch (error) {
      next(error);
    }
  }

  async bestSellerProducts(req, res, next) {
    try {
      const userId = req.user ? req.user.id : null;
      const response = await productServ.bestSellerProducts(userId);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Top 12 best seller products"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
