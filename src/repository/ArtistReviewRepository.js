const CrudRepository = require("./CrudRepository");
const { ArtistReview } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class ArtistReviewRepository extends CrudRepository {
  constructor() {
    super(ArtistReview);
  }

  async getAllByArtistId(id) {
    try {
      const response = await this.model.findAll({
        where: { artist_id: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch reviews for artist",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ArtistReviewRepository;
