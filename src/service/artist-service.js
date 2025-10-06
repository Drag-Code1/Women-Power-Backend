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
  async getAllArtists(page) {
    try {
      const limit = 8;
      const response = await this.artistRepo.getAllArtists(page, limit);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch artists",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.get All Artist by filter
  async getArtistsFilter(data) {
    const { categories, experience } = data;

    try {
      // Fetch all artists for the given category IDs in parallel
      const artistsByCategory = await Promise.all(
        categories.map((catId) => this.artistRepo.getAllByCatgId(catId))
      );

      // Flatten the array of arrays
      const allArtists = artistsByCategory.flat();

      // Filter based on experience
      const filteredArtists = allArtists.filter(
        (artist) =>
          artist.experience >= experience.minExp &&
          artist.experience <= experience.maxExp
      );

      return filteredArtists;
    } catch (error) {
      throw error;
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

  //5.Search artists
  async searchArtists(name) {
    try {
      const response = await this.artistRepo.searchByName(name);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch searched artists",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ArtistService;
