const CrudRepository = require("./CrudRepository");
const { Artist } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class ArtistRepository extends CrudRepository {
  constructor() {
    super(Artist);
  }

  async getAllByCatgId(id) {
    try {
      const response = await this.model.findAll({
        where: { category_id: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch artists by category",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async countAll() {
    try {
      const count = await this.model.count();
      return count;
    } catch (error) {
      throw new AppError(
        "Could not count.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ArtistRepository;
