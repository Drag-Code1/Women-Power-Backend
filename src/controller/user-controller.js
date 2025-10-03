const { StatusCodes } = require("http-status-codes");
const UserService = require("../service/user-service");
const success = require("../utils/success/success-response");

const userServ = new UserService();

class UserController {
  //1.Post-->create new user
  async createUser(req, res, next) {
    try {
      const response = await userServ.createUser(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "user created successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get by id --> get user by id
  async getUser(req, res, next) {
    try {
      const response = await userServ.getUserById(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "user retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.getAllUser
  async getAllUsers(req, res, next) {
    try {
      const response = await userServ.getAllUsers();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "all user retrived"));
    } catch (error) {
      next(error);
    }
  }

  //4.update
  async updateUser(req, res, next) {
    try {
      const response = await userServ.updateUser(req.params.id, req.body);
      return res.status(StatusCodes.OK).json(success(response, "user updated"));
    } catch (error) {
      next(error);
    }
  }


  //5.delete
  // async deleteUser(req, res, next) {
  //   try {
  //     const response = await userServ.deleteUser(req.params.id);
  //     return res.status(StatusCodes.OK).json({
  //       success: true,
  //       data: response,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new UserController();
