const ImageRepository = require("../repository/ImageRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ImageService {
  constructor() {
    this.imgRepo = new ImageRepository();
  }

  //1.Add new image
  async addNewImage(data) {
    try {
      const response = await this.imgRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create banner",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All Images
  async getAllImages() {
    try {
      const response = await this.imgRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch banners",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update image
  async updateImage(id, data) {
    try {
      const response = await this.imgRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update Image",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete Image
  async deleteImage(id) {
    try {
      const response = await this.imgRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImageService ;
