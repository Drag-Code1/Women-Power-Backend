const express = require('express');
const router = express.Router();
const LoginController = require('../controller/login-controller');

router.post("/", (req, res, next) =>
  LoginController.loginUser(req, res, next)
);

router.post("/otp", (req, res, next) =>
  LoginController.validateOtp(req, res, next)
);

module.exports = router ;
