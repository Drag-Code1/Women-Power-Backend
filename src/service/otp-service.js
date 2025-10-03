const OtpRepository = require("../repository/OtpRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class OtpService {
  constructor() {
    this.otpRepository = new OtpRepository();
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

      const { expiry, otp } = response.get();

      const diffMinutes = (new Date() - expiry) / (1000 * 60);

      if (diffMinutes > 5) {
        return {
          login: false,
          message: "OTP expired. Please request a new one.",
        };
      }

      if (otp !== data.otp) {
        return { login: false, message: "Invalid OTP." };
      }

      return { login: true, message: "OTP verified successfully!" };
    } catch (error) {
      throw new AppError(
        "No OTP found. Please request a new one.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OtpService;
