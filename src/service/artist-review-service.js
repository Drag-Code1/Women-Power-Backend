const ArtistReviewRepo = require("../repository/ArtistReviewRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ArtistReviewService {
  constructor() {
    this.artist_review_Repo = new ArtistReviewRepo();
  }

  //1.Add new Artist Review
  async addNewArtistReview(data) {
    try {
      const response = await this.artist_review_Repo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create Artist review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All Artist Review by artistId
  async getArtistReviews(artistId) {
    try {
      const response = await this.artist_review_Repo.getAllByArtistId(artistId);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch artist reviews",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update Artist Review
  async updateArtistReview(id, data) {
    try {
      const response = await this.artist_review_Repo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete Artist Review
  async deleteArtistReview(id) {
    try {
      const response = await this.artist_review_Repo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ArtistReviewService ;
