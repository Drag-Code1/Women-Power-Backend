const CategoryService = require("../service/category-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const catgServ = new CategoryService();

class CategoryController {
  //1.add new category
  async createCategory(req, res, next) {
    try {
      const response = await catgServ.addNewCategory(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Category created successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All Categories
  async getAllCategories(req, res, next) {
    try {
      const response = await catgServ.getAllCategories();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All categories retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateCategory(req, res, next) {
    try {
      const response = await catgServ.updateCategory(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Category updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteCategory(req, res, next) {
    try {
      const response = await catgServ.deleteCategory(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  //5.get by id
  async getCategoryById(req, res, next) {
    try {
      const response = await catgServ.getCategoryById(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "category details"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
