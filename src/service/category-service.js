const CategoryRepository = require("../repository/CategoryRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class CategoryService {
  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  //1.Add new Category
  async addNewCategory(data) {
    try {
      const response = await this.categoryRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create category",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All categories
  async getAllCategories() {
    try {
      const response = await this.categoryRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch categories",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update category
  async updateCategory(id, data) {
    try {
      const response = await this.categoryRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update category",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete category
  async deleteCategory(id) {
    try {
      const response = await this.categoryRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //5.get by Id
  async getCategoryById(id) {
    try {
      const response = await this.categoryRepo.get(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryService;
