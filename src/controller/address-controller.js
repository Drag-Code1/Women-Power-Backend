const AddressService = require("../service/address-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const addServ = new AddressService();

class AddressController {
  //1.create
  async newAddress(req, res, next) {
    try {
      const response = await addServ.newAddress(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Address saved"));
    } catch (error) {
      next(error);
    }
  }

  //2.find all by user Id
  async getAddressByUserId(req, res, next) {
    try {
      const response = await addServ.getAddressesByUserId(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "user addresses"));
    } catch (error) {
      next(error);
    }
  }

  //3.Update Address
  async updateAddress(req, res, next) {
    try {
      const response = await addServ.updateAddress(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "address updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.Dalete Address
  async deleteAddress(req, res, next) {
    try {
      const response = await addServ.deleteAddress(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "address deleted"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AddressController();
