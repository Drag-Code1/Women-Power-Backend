const ArtistRepository = require("../repository/ArtistRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ArtistService {
  constructor() {
    this.artistRepo = new ArtistRepository();
  }

  //1.Add new Artist
  async addNewArtist(data) {
    try {
      const response = await this.artistRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create Artist",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All Artist
  async getAllArtists() {
    try {
      const response = await this.artistRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch artists",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.get All Artist by categoryId
  async getAllArtistsByCategory(catg_id) {
    try {
      const response = await this.artistRepo.getAllByCatgId(catg_id);
      return response;
    } catch (error) {
      throw error ;
    }
  }

  //3.update artist
  async updateArtist(id, data) {
    try {
      const response = await this.artistRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update artist",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete artist
  async deleteArtist(id) {
    try {
      const response = await this.artistRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ArtistService;
