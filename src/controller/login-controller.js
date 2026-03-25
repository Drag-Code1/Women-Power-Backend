const success = require("../utils/success/success-response");
const mail = require("../service/mail-service");
const OtpService = require("../service/otp-service");
const UserRepo = require("../repository/UserRepository");
const { StatusCodes } = require("http-status-codes");

const otpServ = new OtpService();
const userRepo = new UserRepo();

class LoginController {
  //1.send otp + stored in db
  async loginUser(req, res, next) {
    
    const email = req.body.email;

    try {
      try {
        await userRepo.getUserByMail(email);
      } catch (err) {
        // userRepo throws an error if user isn't found
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Please sign up first, then login." });
      }

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
      if (response.login === false) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: response.message });
      }
      return res
        .status(StatusCodes.OK)
        .json(success(response, response.message));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();
