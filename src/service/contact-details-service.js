const ContactRepo = require("../repository/ContactDetailsRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ContactDetailsService {
  constructor() {
    this.ContactRepo = new ContactRepo();
  }

  //1.Add new contacct details
  async addNewContactDetailsToDb(data) {
    try {
      const response = await this.ContactRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Request is not send, try again",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.getAll contact details
  async getAllContactDetails() {
    try {
      const response = await this.ContactRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch details",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.Delete details
  async deleteDetails(id) {
    try {
      const response = await this.ContactRepo.destroy(id);
      return response;
    } catch (error) {
      throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
    }
  }
}

module.exports = ContactDetailsService;
