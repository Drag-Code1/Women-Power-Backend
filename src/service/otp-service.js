const OtpRepository = require("../repository/OtpRepository");
const UserRepo = require("../repository/UserRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/config");

class OtpService {
  constructor() {
    this.otpRepository = new OtpRepository();
    this.userRepo = new UserRepo();
  }

  async addNewOrUpdate(data) {
    try {
      const otp = await this.otpRepository.findOrCreateOtp(data);
      return otp;
    } catch (error) {
      throw new AppError(
        "failed, try again",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateOtp(data) {
    try {
      const response = await this.otpRepository.get(data.email);

      const user = await this.userRepo.getUserByMail(data.email);

      const { expiry, otp } = response.get();

      const diffMinutes = (new Date() - new Date(expiry)) / (1000 * 60);

      if (diffMinutes > 5) {
        return {
          login: false,
          message: "OTP expired. Please request a new one.",
        };
      }

      if (otp !== data.otp) {
        return { login: false, message: "Invalid OTP." };
      }

      const token = this.generateToken(user);
      const info = { user, token };
      return { info, message: "OTP verified successfully!" };
    } catch (error) {
      throw new AppError(
        "Error!!, Please request a new one.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
}

module.exports = OtpService;
