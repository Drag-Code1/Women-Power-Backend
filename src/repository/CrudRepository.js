const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  //create
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to create resourse",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //destroy
  async destroy(id) {
    const response = await this.model.destroy({ where: { id } });
    if (!response) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  //get by id
  async get(id) {
    const response = await this.model.findByPk(id);
    if (!response) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  //getAll
  async getAll() {
    return this.model.findAll();
  }

  //update
  async update(id, data) {
    const [updated] = await this.model.update(data, { where: { id } });
    if (!updated) {
      throw new AppError("Resourse not found", StatusCodes.NOT_FOUND);
    }
    return await this.model.findByPk(id);
  }
}

module.exports = CrudRepository;
