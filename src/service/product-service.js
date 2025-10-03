const ProductRepository = require("../repository/ProductRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ProductService {
  constructor() {
    this.productRepo = new ProductRepository();
  }

  //1.Create a new product
  async createProduct(data) {
    try {
      const response = await this.productRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to add product",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.Get product details by ID
  async getProductById(id) {
    try {
      const response = await this.productRepo.get(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //3.Get all products
  async getAllProducts() {
    try {
      const response = await this.productRepo.getAllProducts();
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.Update product
  async updateProduct(id, data) {
    try {
      const response = await this.productRepo.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //5.Delete product
  async deleteProduct(id) {
    try {
      const response = await this.productRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService ;