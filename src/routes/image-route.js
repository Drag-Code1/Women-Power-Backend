const express = require("express");
const router = express.Router();
const ImageController = require("../controller/image-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("admin"), (req, res, next) =>
  ImageController.createImage(req, res, next)
);
router.get("/", (req, res, next) =>
  ImageController.getAllImages(req, res, next)
);
router.put("/:id", auth("admin"), (req, res, next) =>
  ImageController.updateImage(req, res, next)
);
router.delete("/:id", auth("admin"), (req, res, next) =>
  ImageController.deleteImage(req, res, next)
);

module.exports = router;
