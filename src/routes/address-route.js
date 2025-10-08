const express = require("express");
const router = express.Router();
const AddressController = require("../controller/address-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  AddressController.newAddress(req, res, next)
);
router.get("/:id", auth("user"), (req, res, next) =>
  AddressController.getAddressByUserId(req, res, next)
);
router.put("/:id", auth("user"), (req, res, next) =>
  AddressController.updateAddress(req, res, next)
);
router.delete("/:id", auth("user"), (req, res, next) =>
  AddressController.deleteAddress(req, res, next)
);

module.exports = router;
