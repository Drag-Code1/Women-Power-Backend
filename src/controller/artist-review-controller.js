const ArtistReviewService = require("../service/artist-review-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const artist_review_Serv = new ArtistReviewService();

class ArtistReviewController {
  //1.add new Artist review
  async createArtistReview(req, res, next) {
    try {
      const response = await artist_review_Serv.addNewArtistReview(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Review sent successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All Artist reviews
  async getArtistReviews(req, res, next) {
    try {
      const response = await artist_review_Serv.getArtistReviews(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All reviews retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateArtistReview(req, res, next) {
    try {
      const response = await artist_review_Serv.updateArtistReview(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "review updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteArtistReview(req, res, next) {
    try {
      const response = await artist_review_Serv.deleteArtistReview(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArtistReviewController();