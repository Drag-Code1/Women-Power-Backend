const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const AppError = require("../utils/errors/AppError");
const CrudRepository = require("./CrudRepository");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByMail(mail) {
    try {
      const response = await this.model.findOne({ where: { email: mail } });

      if (!response) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Database error while fetching user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = UserRepository;
