const CrudRepository = require("./CrudRepository");
const { Address } = require("../models");
const AppError = require("../utils/errors/AppError");

class AddressRepository extends CrudRepository {
  constructor() {
    super(Address);
  }

  async findByUserId(id) {
    try {
      const address = await this.model.findAll({
        where: { userId: id },
      });
      
      return address ;

    } catch (error) {
      throw new AppError(
        "no address found.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = AddressRepository;
