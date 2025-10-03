const UserRepository = require("../repository/UserRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Create a new user
  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);

      const plainUser = user.get({ plain: true });

      // Return only selected fields
      const safeUser = {
        id: plainUser.id,
        firstName: plainUser.firstName,
        lastName: plainUser.lastName,
        email: plainUser.email,
        gender: plainUser.gender,
        mobileNo: plainUser.mobileNo,
      };

      return safeUser;
    } catch (error) {
      throw new AppError(
        "Failed to create user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await this.userRepository.get(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAll();
      return users;
    } catch (error) {
      throw new AppError(
        "Failed to fetch users",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update user
  async updateUser(id, data) {
    try {
      const updatedUser = await this.userRepository.update(id, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // // Delete user
  // async deleteUser(id) {
  //   try {
  //     const response = await this.userRepository.destroy(id);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = UserService;
