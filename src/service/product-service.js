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
  async getAllProducts(page) {
    try {
      const limit = 16;
      const response = await this.productRepo.getAllProducts(page, limit);
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

  //6.get All Products by filter
  async getProductsFilter(data) {
    const { categories = [], price = { minPrice: 0, maxPrice: 0 } } = data;

    try {
      let allProducts;

      // Check if categories array has any values
      if (Array.isArray(categories) && categories.length > 0) {
        const productsByCategory = await Promise.all(
          categories.map((catId) => this.productRepo.getAllByCatgId(catId))
        );
        allProducts = productsByCategory.flat();
      } else {
        // No categories provided, fetch all products
        allProducts = await this.productRepo.getAll();
      }

      // Filter based on price only if maxPrice is not 0
      let filteredProducts = allProducts;
      if (price.maxPrice !== 0) {
        filteredProducts = allProducts.filter(
          (product) =>
            product.price >= price.minPrice && product.price <= price.maxPrice
        );
      }

      return filteredProducts;
    } catch (error) {
      throw error;
    }
  }

  //5.Search products
  async searchProducts(search) {
    try {
      const response = await this.productRepo.searchByName(search);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch searched products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //6.get tranding products
  async getTrandingProducts() {
    try {
      const response = await this.productRepo.getTrendingP();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;
