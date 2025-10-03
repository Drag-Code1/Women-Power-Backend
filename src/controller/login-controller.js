const success = require("../utils/success/success-response");
const mail = require("../service/mail-service");
const OtpService = require("../service/otp-service");
const { StatusCodes } = require("http-status-codes");

const otpServ = new OtpService();

class LoginController {
  //1.send otp + stored in db
  async loginUser(req, res, next) {
    
    const email = req.body.email;

    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      await otpServ.addNewOrUpdate({email, otp});

      await mail.sendMail(
        email,
        "Your OTP for Women Power",
        `<h3>Hi,</h3>
         <p>Your One-Time Password (OTP) is: <b>${otp}</b></p>
         <p>It will expire in 5 minutes.</p>`
      );

      return res
        .status(StatusCodes.OK)
        .json(success({email}, "OTP sent successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.Validate Otp
  async validateOtp(req, res, next) {
    try {
      const response = await otpServ.validateOtp(req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response.login, response.message));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();
