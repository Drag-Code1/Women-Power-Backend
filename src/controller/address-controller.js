const AddressService = require("../service/address-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const addServ = new AddressService();

class AddressController {
  //1.create
  async newAddress(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }

      const response = await addServ.newAddress({ ...req.body, userId });
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
      const requester = req.user;
      const userId = req.params.id;
      if (!requester) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }
      if (requester.role !== "admin" && requester.id !== userId) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ success: false, message: "Forbidden" });
      }

      const response = await addServ.getAddressesByUserId(userId);
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
      const requester = req.user;
      if (!requester) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }
      const existing = await addServ.getAddressById(req.params.id);
      if (requester.role !== "admin" && existing.userId !== requester.id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ success: false, message: "Forbidden" });
      }

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
      const requester = req.user;
      if (!requester) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }
      const existing = await addServ.getAddressById(req.params.id);
      if (requester.role !== "admin" && existing.userId !== requester.id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ success: false, message: "Forbidden" });
      }

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
