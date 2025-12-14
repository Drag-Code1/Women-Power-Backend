const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  //create
  async create(data, options = {}) {
    try {
      const response = await this.model.create(data, options);
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to create resourse",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //destroy
  async destroy(id, options = {}) {
    const response = await this.model.destroy({ where: { id }, ...options });
    if (!response) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  //get by id
  async get(id, options = {}) {
    const response = await this.model.findByPk(id, options);
    if (!response) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  //getAll
  async getAll(options = {}) {
    return this.model.findAll(options);
  }

  //update
  async update(id, data, options = {}) {
    const [updated] = await this.model.update(data, { where: { id }, ...options });
    if (!updated) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return await this.model.findByPk(id, options);
  }
}

module.exports = CrudRepository;
