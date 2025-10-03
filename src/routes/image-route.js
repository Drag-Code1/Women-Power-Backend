const express = require("express");
const router = express.Router();
const ImageController = require("../controller/image-controller");

router.post("/", (req, res, next) =>
  ImageController.createImage(req, res, next)
);
router.get("/", (req, res, next) =>
  ImageController.getAllImages(req, res, next)
);
router.put("/:id", (req, res, next) =>
  ImageController.updateImage(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ImageController.deleteImage(req, res, next)
);

module.exports = router;
