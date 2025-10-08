const express = require("express");
const router = express.Router();
const ContactDetailsController = require("../controller/contact-details-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  ContactDetailsController.addContactDetails(req, res, next)
);
router.get("/", auth("admin"), (req, res, next) =>
  ContactDetailsController.fetchAllDetails(req, res, next)
);
router.delete("/:id", auth("admin"), (req, res, next) =>
  ContactDetailsController.deleteDetails(req, res, next)
);

module.exports = router;
