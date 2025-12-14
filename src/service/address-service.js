const AddressRepository = require("../repository/AddressRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class AddressService {
  constructor() {
    this.addressRepository = new AddressRepository();
  }

  //1.create new address
  async newAddress(data) {
    try {
      // Normalize type to allowed enum values
      const normalizedType =
        data.type === "Work" ? "Office" : data.type === "Office" ? "Office" : "Home";

      const payload = { ...data, type: normalizedType };
      const response = await this.addressRepository.create(payload);
      return response;
    } catch (error) {
      throw new AppError(
        "address not saved, try again",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get By userId
  async getAddressesByUserId(id) {
    try {
      const response = await this.addressRepository.findByUserId(id);
      return response;
    } catch (error) {
      throw new AppError("address not found", StatusCodes.NOT_FOUND);
    }
  }

  async getAddressById(id) {
    return this.addressRepository.get(id);
  }

  //3.update address
  async updateAddress(addressId, data) {
    try {
      const response = await this.addressRepository.update(addressId, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //4. delete Address
  async deleteAddress(id) {
    try {
      const response = await this.addressRepository.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AddressService;
