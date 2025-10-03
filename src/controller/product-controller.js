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
      const response = await productServ.getAllProducts();
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
}

module.exports = new ProductController();
