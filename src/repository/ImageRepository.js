const CrudRepository = require("./CrudRepository");
const { Image } = require("../models");

class ImageRepository extends CrudRepository {
  constructor() {
    super(Image);
  }
}

module.exports = ImageRepository;
