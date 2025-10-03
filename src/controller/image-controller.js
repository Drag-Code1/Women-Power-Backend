const ImageService = require("../service/image-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const imgServ = new ImageService();

class ImageController {
  //1.add new Image
  async createImage(req, res, next) {
    try {
      const response = await imgServ.addNewImage(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Banner added successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All images
  async getAllImages(req, res, next) {
    try {
      const response = await imgServ.getAllImages();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All banners retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update image
  async updateImage(req, res, next) {
    try {
      const response = await imgServ.updateImage(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Banner updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete image
  async deleteImage(req, res, next) {
    try {
      const response = await imgServ.deleteImage(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Banner deleted."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ImageController();
