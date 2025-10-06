const CrudRepository = require("./CrudRepository");
const { Artist } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

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
      throw new AppError("Could not count.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async searchByName(name) {
    try {
      return await this.model.findAll({
        where: {
          artist_Name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } catch (error) {
      throw new AppError(
        "Failed to search artists by name",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllArtists(page, limit) {
    const offset = (page - 1) * limit;
    try {
      const { count, rows } = await this.model.findAndCountAll({
        offset,
        limit,
      });

      return {
        totalArtists: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      };
    } catch (error) {
      throw new AppError(
        "Fail to fetch all artist.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ArtistRepository;
