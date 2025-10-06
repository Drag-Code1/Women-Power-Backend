const ArtistService = require("../service/artist-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const artistServ = new ArtistService();

class ArtistController {
  //1.add new Artist
  async createArtist(req, res, next) {
    try {
      const response = await artistServ.addNewArtist(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Artist created successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All Artists
  async getAllArtists(req, res, next) {
    const page = parseInt(req.query.page);
    try {
      const response = await artistServ.getAllArtists(page);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All artists retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.get All Artists by category
  async getArtistFilter(req, res, next) {
    try {
      const response = await artistServ.getArtistsFilter(req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All filtered artists retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateArtist(req, res, next) {
    try {
      const response = await artistServ.updateArtist(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Artist updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteArtist(req, res, next) {
    try {
      const response = await artistServ.deleteArtist(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  //5.search artists
  async searchArtists(req, res, next) {
    try {
      const response = await artistServ.searchArtists(req.params.name);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArtistController();
