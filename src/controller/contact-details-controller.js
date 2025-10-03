const { StatusCodes } = require("http-status-codes");
const ContactDetailsService = require("../service/contact-details-service");
const success = require("../utils/success/success-response");

const contactServ = new ContactDetailsService();

class ContactDetailsController {
  //1.add contact details
  async addContactDetails(req, res, next) {
    try {
      const response = await contactServ.addNewContactDetailsToDb(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Details sent successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.fetch All details
  async fetchAllDetails(req, res, next) {
    try {
      const response = await contactServ.getAllContactDetails();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All Details Fetched"));
    } catch (error) {
      next(error);
    }
  }

  //3.delete details by admin
  async deleteDetails(req, res, next) {
    try {
      const response = await contactServ.deleteDetails(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Details deleted."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactDetailsController();
