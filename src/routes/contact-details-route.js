const express = require("express");
const router = express.Router();
const ContactDetailsController = require("../controller/contact-details-controller");

router.post("/", (req, res, next) =>
  ContactDetailsController.addContactDetails(req, res, next)
);
router.get("/", (req, res, next) =>
  ContactDetailsController.fetchAllDetails(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ContactDetailsController.deleteDetails(req, res, next)
);

module.exports = router;
