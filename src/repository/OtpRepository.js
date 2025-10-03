const { OTP } = require("../models");
const CrudRepository = require("./CrudRepository");

class OtpRepository extends CrudRepository {
  constructor() {
    super(OTP);
  }

  async findOrCreateOtp(data) {
    try {
      const [otpRecord, created] = await this.model.findOrCreate({
        where: { email: data.email },
        defaults: { otp: data.otp, expiry: new Date() },
      });

      if (!created) {
        otpRecord.otp = data.otp;
        otpRecord.expiry = new Date();
        await otpRecord.save();
      }

      return otpRecord;
    } catch (error) {
      throw new AppError(
        "failed to store otp",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OtpRepository;
