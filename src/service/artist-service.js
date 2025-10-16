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

  // Get Artist details by ID
  async getArtistById(id) {
    try {
      const response = await this.artistRepo.get(id);
      return response;
    } catch (error) {
      throw error;
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

  // 3. Get All Artists by Filter
  async getArtistsFilter(data) {
    const {
      categories = [],
      experience = { minExp: 0, maxExp: 0 },
    } = data;

    try {
      let allArtists;

      if (Array.isArray(categories) && categories.length > 0) {
        const artistsByCategory = await Promise.all(
          categories.map((catId) => this.artistRepo.getAllByCatgId(catId))
        );
        allArtists = artistsByCategory.flat();
      } else {
        allArtists = await this.artistRepo.getAll();
      }

      let filteredArtists = allArtists;
      if (experience.maxExp > 0) {
        filteredArtists = allArtists.filter(
          (artist) =>
            artist.experience >= experience.minExp &&
            artist.experience <= experience.maxExp
        );
      }

      return filteredArtists;
    } catch (error) {
      console.error("Error filtering artists:", error);
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
