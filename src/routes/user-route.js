const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", (req, res, next) => UserController.createUser(req, res, next));
router.get("/:id", auth("user"), (req, res, next) =>
  UserController.getUser(req, res, next)
);
router.get("/", auth("admin"), (req, res, next) =>
  UserController.getAllUsers(req, res, next)
);
router.put("/:id", auth("user"), (req, res, next) =>
  UserController.updateUser(req, res, next)
);

module.exports = router;
