const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");

router.post("/", (req, res, next) => UserController.createUser(req, res, next));
router.get("/:id", (req, res, next) => UserController.getUser(req, res, next));
router.get("/", (req, res, next) => UserController.getAllUsers(req, res, next));
router.put("/:id", (req, res, next) =>
  UserController.updateUser(req, res, next)
);

module.exports = router;
